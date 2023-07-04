// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IMACI} from "./IMACI.sol";
import {Params} from "./Params.sol";
import {SnarkCommon} from "./crypto/SnarkCommon.sol";
import {DomainObjs, IPubKey, IMessage} from "./DomainObjs.sol";
import {AccQueue, AccQueueQuinaryMaci} from "./trees/AccQueue.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {VkRegistry} from "./VkRegistry.sol";
import {IVerifier} from "./crypto/Verifier.sol";
import {EmptyBallotRoots} from "./trees/EmptyBallotRoots.sol";
import {TopupCredit} from "./TopupCredit.sol";
import {Utilities} from "./utilities/Utility.sol";
import {MessageProcessor} from "./MessageProcessor.sol";

contract PollDeploymentParams {
    struct ExtContracts {
        VkRegistry vkRegistry;
        IMACI maci;
        AccQueue messageAq;
        AccQueue deactivatedKeysAq;
        TopupCredit topupCredit;
    }
}

/*
 * A factory contract which deploys Poll contracts. It allows the MACI contract
 * size to stay within the limit set by EIP-170.
 */
contract PollFactory is Params, IPubKey, Ownable, PollDeploymentParams {
    /*
     * Deploy a new Poll contract and AccQueue contract for messages.
     */
    function deploy(
        uint256 _duration,
        MaxValues memory _maxValues,
        TreeDepths memory _treeDepths,
        BatchSizes memory _batchSizes,
        PubKey memory _coordinatorPubKey,
        VkRegistry _vkRegistry,
        IMACI _maci,
        TopupCredit _topupCredit,
        address _pollOwner
    ) public onlyOwner returns (Poll) {
        uint256 treeArity = 5;

        // Validate _maxValues
        // NOTE: these checks may not be necessary. Removing them will save
        // 0.28 Kb of bytecode.

        // maxVoteOptions must be less than 2 ** 50 due to circuit limitations;
        // it will be packed as a 50-bit value along with other values as one
        // of the inputs (aka packedVal)

        require(
            _maxValues.maxMessages <=
                treeArity ** uint256(_treeDepths.messageTreeDepth) &&
                _maxValues.maxMessages >= _batchSizes.messageBatchSize &&
                _maxValues.maxMessages % _batchSizes.messageBatchSize == 0 &&
                _maxValues.maxVoteOptions <=
                treeArity ** uint256(_treeDepths.voteOptionTreeDepth) &&
                _maxValues.maxVoteOptions < (2 ** 50),
            "PollFactory: invalid _maxValues"
        );

        AccQueue messageAq = new AccQueueQuinaryMaci(
            _treeDepths.messageTreeSubDepth
        );

        AccQueue deactivatedKeysAq = new AccQueueQuinaryMaci(_treeDepths.messageTreeSubDepth);

        ExtContracts memory extContracts;

        // TODO: remove _vkRegistry; only PollProcessorAndTallyer needs it
        extContracts.vkRegistry = _vkRegistry;
        extContracts.maci = _maci;
        extContracts.messageAq = messageAq;
        extContracts.deactivatedKeysAq = deactivatedKeysAq;
        extContracts.topupCredit = _topupCredit;

        Poll poll = new Poll(
            _duration,
            _maxValues,
            _treeDepths,
            _batchSizes,
            _coordinatorPubKey,
            extContracts
        );

        // Make the Poll contract own the messageAq contract, so only it can
        // run enqueue/merge
        messageAq.transferOwnership(address(poll));
        deactivatedKeysAq.transferOwnership(address(poll));

        // init messageAq & deactivatedKeysAq
        poll.init();

        // TODO: should this be _maci.owner() instead?
        poll.transferOwnership(_pollOwner);

        return poll;
    }
}

/*
 * Do not deploy this directly. Use PollFactory.deploy() which performs some
 * checks on the Poll constructor arguments.
 */
contract Poll is
    Params,
    Utilities,
    SnarkCommon,
    Ownable,
    PollDeploymentParams,
    EmptyBallotRoots
{
    using SafeERC20 for ERC20;

    bool internal isInit = false;
    // The coordinator's public key
    PubKey public coordinatorPubKey;

    uint256 public mergedStateRoot;
    uint256 public coordinatorPubKeyHash;

    // TODO: to reduce the Poll bytecode size, consider storing deployTime and
    // duration in a mapping in the MACI contract

    // The timestamp of the block at which the Poll was deployed
    uint256 internal deployTime;

    // The duration of the polling period, in seconds
    uint256 internal duration;

    uint256 public deactivationChainHash;

    function getDeployTimeAndDuration() public view returns (uint256, uint256) {
        return (deployTime, duration);
    }

    // Whether the MACI contract's stateAq has been merged by this contract
    bool public stateAqMerged;

    // The commitment to the state leaves and the ballots. This is
    // hash3(stateRoot, ballotRoot, salt).
    // Its initial value should be
    // hash(maciStateRootSnapshot, emptyBallotRoot, 0)
    // Each successful invocation of processMessages() should use a different
    // salt to update this value, so that an external observer cannot tell in
    // the case that none of the messages are valid.
    uint256 public currentSbCommitment;

    uint256 internal numMessages;
    uint256 internal numDeactivatedKeys;

    function numSignUpsAndMessagesAndDeactivatedKeys()
        public
        view
        returns (uint256, uint256, uint256)
    {
        uint256 numSignUps = extContracts.maci.numSignUps();
        return (numSignUps, numMessages, numDeactivatedKeys);
    }

    MaxValues public maxValues;
    TreeDepths public treeDepths;
    BatchSizes public batchSizes;

    // Error codes. We store them as constants and keep them short to reduce
    // this contract's bytecode size.
    string constant ERROR_VOTING_PERIOD_PASSED = "PollE01";
    string constant ERROR_VOTING_PERIOD_NOT_PASSED = "PollE02";
    string constant ERROR_INVALID_PUBKEY = "PollE03";
    string constant ERROR_MAX_MESSAGES_REACHED = "PollE04";
    string constant ERROR_STATE_AQ_ALREADY_MERGED = "PollE05";
    string constant ERROR_STATE_AQ_SUBTREES_NEED_MERGE = "PollE06";
    string constant ERROR_INVALID_SENDER = "PollE07";
    string constant ERROR_MAX_DEACTIVATED_KEYS_REACHED = "PollE08";
    string constant ERROR_VERIFICATION_FAILED = "PollE09";
    string constant ERROR_DEACTIVATION_PERIOD_NOT_PASSED = "PollE10";
    string constant ERROR_DEACTIVATION_PERIOD_PASSED = "PollE11";

    event PublishMessage(Message _message, PubKey _encPubKey);
    event TopupMessage(Message _message);
    event MergeMaciStateAqSubRoots(uint256 _numSrQueueOps);
    event MergeMaciStateAq(uint256 _stateRoot);
    event MergeMessageAqSubRoots(uint256 _numSrQueueOps);
    event MergeMessageAq(uint256 _messageRoot);
    event AttemptKeyDeactivation(Message _message, PubKey _encPubKey);
    event DeactivateKey(uint256 keyHash, uint256[2] c1, uint256[2] c2);

    ExtContracts public extContracts;

    /*
     * Each MACI instance can have multiple Polls.
     * When a Poll is deployed, its voting period starts immediately.
     */
    constructor(
        uint256 _duration,
        MaxValues memory _maxValues,
        TreeDepths memory _treeDepths,
        BatchSizes memory _batchSizes,
        PubKey memory _coordinatorPubKey,
        ExtContracts memory _extContracts
    ) {
        extContracts = _extContracts;

        coordinatorPubKey = _coordinatorPubKey;
        coordinatorPubKeyHash = hashLeftRight(
            _coordinatorPubKey.x,
            _coordinatorPubKey.y
        );
        duration = _duration;
        deactivationChainHash = 8370432830353022751713833565135785980866757267633941821328460903436894336785;
        maxValues = _maxValues;
        batchSizes = _batchSizes;
        treeDepths = _treeDepths;

        // Record the current timestamp
        deployTime = block.timestamp;
    }

    /*
     * A modifier that causes the function to revert if the voting period is
     * not over.
     */
    modifier isAfterVotingDeadline() {
        uint256 secondsPassed = block.timestamp - deployTime;
        require(secondsPassed > duration, ERROR_VOTING_PERIOD_NOT_PASSED);
        _;
    }

    modifier isWithinVotingDeadline() {
        uint256 secondsPassed = block.timestamp - deployTime;
        require(secondsPassed < duration, ERROR_VOTING_PERIOD_PASSED);
        _;
    }

    // should be called immediately after Poll creation and messageAq ownership transferred
    function init() public {
        require(!isInit, "Poll contract already init");
        // set to true so it cannot be called again
        isInit = true;

        unchecked {
            numMessages++;
        }

        // init messageAq here by inserting placeholderLeaf
        uint256[2] memory dat;
        dat[0] = NOTHING_UP_MY_SLEEVE;
        dat[1] = 0;
        (
            Message memory _message,
            PubKey memory _padKey,
            uint256 placeholderLeaf
        ) = padAndHashMessage(dat, 1);
        extContracts.messageAq.enqueue(placeholderLeaf);

        emit PublishMessage(_message, _padKey);
    }

    /*
     * Allows to publish a Topup message
     * @param stateIndex The index of user in the state queue
     * @param amount The amount of credits to topup
     */
    function topup(
        uint256 stateIndex,
        uint256 amount
    ) public isWithinVotingDeadline {
        require(
            numMessages <= maxValues.maxMessages,
            ERROR_MAX_MESSAGES_REACHED
        );

        unchecked {
            numMessages++;
        }

        extContracts.topupCredit.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        uint256[2] memory dat;
        dat[0] = stateIndex;
        dat[1] = amount;
        (Message memory _message, , uint256 messageLeaf) = padAndHashMessage(
            dat,
            2
        );
        extContracts.messageAq.enqueue(messageLeaf);

        emit TopupMessage(_message);
    }

    /*
     * Allows anyone to publish a message (an encrypted command and signature).
     * This function also enqueues the message.
     * @param _message The message to publish
     * @param _encPubKey An epheremal public key which can be combined with the
     *     coordinator's private key to generate an ECDH shared key with which
     *     to encrypt the message.
     */
    function publishMessage(
        Message memory _message,
        PubKey memory _encPubKey
    ) public isWithinVotingDeadline {
        require(
            numMessages <= maxValues.maxMessages,
            ERROR_MAX_MESSAGES_REACHED
        );
        require(
            _encPubKey.x < SNARK_SCALAR_FIELD &&
                _encPubKey.y < SNARK_SCALAR_FIELD,
            ERROR_INVALID_PUBKEY
        );

        unchecked {
            numMessages++;
        }

        _message.msgType = 1;
        uint256 messageLeaf = hashMessageAndEncPubKey(_message, _encPubKey);
        extContracts.messageAq.enqueue(messageLeaf);

        emit PublishMessage(_message, _encPubKey);
    }

    /**
     * @notice Attempts to deactivate the User's MACI public key
     * @param _message The encrypted message which contains state leaf index
     * @param _encPubKey An epheremal public key which can be combined with the
     *     coordinator's private key to generate an ECDH shared key with which
     *     to encrypt the message.
     */
    function deactivateKey(
        Message memory _message,
        PubKey memory _encPubKey
    ) external {
        require(
            block.timestamp - deployTime <
                extContracts.maci.deactivationPeriod(),
            ERROR_DEACTIVATION_PERIOD_PASSED
        );

        require(
            numMessages <= maxValues.maxMessages,
            ERROR_MAX_MESSAGES_REACHED
        );

        require(
            _encPubKey.x < SNARK_SCALAR_FIELD &&
                _encPubKey.y < SNARK_SCALAR_FIELD,
            ERROR_INVALID_PUBKEY
        );

        unchecked {
            numMessages++;
            numDeactivatedKeys++;
        }

        _message.msgType = 1; // Same as vote, keeping the modified circuit complexity minimal

        uint256 messageLeaf = hashMessageAndEncPubKey(_message, _encPubKey);

        deactivationChainHash = hash2([deactivationChainHash, messageLeaf]);
        extContracts.messageAq.enqueue(messageLeaf);

        emit PublishMessage(_message, _encPubKey);
        emit AttemptKeyDeactivation(_message, _encPubKey);
    }

    /**
     * @notice Confirms the deactivation of a MACI public key. This function must be called by Coordinator after User calls the deactivateKey function
     * @param _batchLeaves Deactivated keys leaves
     * @param _batchSize The capacity of the subroot of the deactivated keys tree
     */
    function confirmDeactivation(
        uint256[][] memory _batchLeaves,
        uint256 _batchSize
    ) external onlyOwner {
        require(
            numDeactivatedKeys <= maxValues.maxMessages,
            ERROR_MAX_DEACTIVATED_KEYS_REACHED
        );

        for (uint256 i = 0; i < _batchSize; i++) {
            uint256 keyHash = _batchLeaves[i][0];
            uint256[2] memory c1;
            uint256[2] memory c2;

            c1[0] = _batchLeaves[i][1];
            c1[1] = _batchLeaves[i][2];
            c2[0] = _batchLeaves[i][3];
            c2[1] = _batchLeaves[i][4];

            extContracts.deactivatedKeysAq.enqueue(hash5([keyHash, c1[0], c1[1], c2[0], c2[1]]));
            emit DeactivateKey(keyHash, c1, c2);
        }
    }

    /*
     * The first step of merging the MACI state AccQueue. This allows the
     * ProcessMessages circuit to access the latest state tree and ballots via
     * currentSbCommitment.
     */
    function mergeMaciStateAqSubRoots(
        uint256 _numSrQueueOps,
        uint256 _pollId
    ) public isAfterVotingDeadline { // TODO: During milestone 3 - onlyOwner fails here because the caller is MessageProcessor and not Maci
        // This function cannot be called after the stateAq was merged
        require(!stateAqMerged, ERROR_STATE_AQ_ALREADY_MERGED);

        if (!extContracts.maci.stateAq().subTreesMerged()) {
            extContracts.maci.mergeStateAqSubRoots(_numSrQueueOps, _pollId);
        }

        emit MergeMaciStateAqSubRoots(_numSrQueueOps);
    }

    /*
     * The second step of merging the MACI state AccQueue. This allows the
     * ProcessMessages circuit to access the latest state tree and ballots via
     * currentSbCommitment.
     * @param _pollId The ID of the Poll
     */
    function mergeMaciStateAq(
        uint256 _pollId
    ) public isAfterVotingDeadline { // TODO: During milestone 3 - onlyOwner fails here because the caller is MessageProcessor and not Maci
        // This function can only be called once per Poll after the voting
        // deadline
        require(!stateAqMerged, ERROR_STATE_AQ_ALREADY_MERGED);

        stateAqMerged = true;

        require(
            extContracts.maci.stateAq().subTreesMerged(),
            ERROR_STATE_AQ_SUBTREES_NEED_MERGE
        );

        mergedStateRoot = extContracts.maci.mergeStateAq(_pollId);

        // Set currentSbCommitment
        uint256[3] memory sb;
        sb[0] = mergedStateRoot;
        sb[1] = emptyBallotRoots[treeDepths.voteOptionTreeDepth - 1];
        sb[2] = uint256(0);

        currentSbCommitment = hash3(sb);
        emit MergeMaciStateAq(mergedStateRoot);
    }

    /*
     * The first step in merging the message AccQueue so that the
     * ProcessMessages circuit can access the message root.
     */
    function mergeMessageAqSubRoots(
        uint256 _numSrQueueOps
    ) public onlyOwner isAfterVotingDeadline {
        extContracts.messageAq.mergeSubRoots(_numSrQueueOps);
        emit MergeMessageAqSubRoots(_numSrQueueOps);
    }

    /*
     * The second step in merging the message AccQueue so that the
     * ProcessMessages circuit can access the message root.
     */
    function mergeMessageAq() public onlyOwner isAfterVotingDeadline {
        uint256 root = extContracts.messageAq.merge(
            treeDepths.messageTreeDepth
        );
        emit MergeMessageAq(root);
    }
}
