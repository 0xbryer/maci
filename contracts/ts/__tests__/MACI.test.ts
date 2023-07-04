jest.setTimeout(90000);
// import * as ethers from 'ethers';
const { ethers } = require('hardhat');
import { BigNumber } from 'ethers';
import { timeTravel } from './utils';
import { parseArtifact, getDefaultSigner } from '../deploy';
import { deployTestContracts } from '../utils';
import { genMaciStateFromContract } from '../genMaciState';
import {
	PCommand,
	VerifyingKey,
	Keypair,
	PubKey,
	Message,
} from 'maci-domainobjs';

import {
	MaciState,
	genProcessVkSig,
	genTallyVkSig,
	MaxValues,
	TreeDepths,
} from 'maci-core';

import { G1Point, G2Point, NOTHING_UP_MY_SLEEVE } from 'maci-crypto';

const STATE_TREE_DEPTH = 10;
const STATE_TREE_ARITY = 5;
const MESSAGE_TREE_DEPTH = 4;
const MESSAGE_TREE_SUBDEPTH = 2;

const coordinator = new Keypair();
const [pollAbi] = parseArtifact('Poll');
const [accQueueQuinaryMaciAbi] = parseArtifact('AccQueueQuinaryMaci');

enum MessageTypes {
	VOTE_MESSAGE = 1, // size 10
	TOP_UP_MESSAGE = 2, // size 2
	DEACTIVATE_KEY = 3, // size 10
	GENERATE_NEW_KEY = 4, // size 10
}

const testProcessVk = new VerifyingKey(
	new G1Point(BigInt(0), BigInt(1)),
	new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
	new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
	new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
	[new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
);

const testProcessDeactivationVk = new VerifyingKey(
	new G1Point(BigInt(0), BigInt(1)),
	new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
	new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
	new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
	[new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
);

const testTallyVk = new VerifyingKey(
	new G1Point(BigInt(0), BigInt(1)),
	new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
	new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
	new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
	[new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
);

const compareVks = (vk: VerifyingKey, vkOnChain: any) => {
	expect(vk.ic.length).toEqual(vkOnChain.ic.length);
	for (let i = 0; i < vk.ic.length; i++) {
		expect(vk.ic[i].x.toString()).toEqual(vkOnChain.ic[i].x.toString());
		expect(vk.ic[i].y.toString()).toEqual(vkOnChain.ic[i].y.toString());
	}
	expect(vk.alpha1.x.toString()).toEqual(vkOnChain.alpha1.x.toString());
	expect(vk.alpha1.y.toString()).toEqual(vkOnChain.alpha1.y.toString());
	expect(vk.beta2.x[0].toString()).toEqual(vkOnChain.beta2.x[0].toString());
	expect(vk.beta2.x[1].toString()).toEqual(vkOnChain.beta2.x[1].toString());
	expect(vk.beta2.y[0].toString()).toEqual(vkOnChain.beta2.y[0].toString());
	expect(vk.beta2.y[1].toString()).toEqual(vkOnChain.beta2.y[1].toString());
	expect(vk.delta2.x[0].toString()).toEqual(vkOnChain.delta2.x[0].toString());
	expect(vk.delta2.x[1].toString()).toEqual(vkOnChain.delta2.x[1].toString());
	expect(vk.delta2.y[0].toString()).toEqual(vkOnChain.delta2.y[0].toString());
	expect(vk.delta2.y[1].toString()).toEqual(vkOnChain.delta2.y[1].toString());
	expect(vk.gamma2.x[0].toString()).toEqual(vkOnChain.gamma2.x[0].toString());
	expect(vk.gamma2.x[1].toString()).toEqual(vkOnChain.gamma2.x[1].toString());
	expect(vk.gamma2.y[0].toString()).toEqual(vkOnChain.gamma2.y[0].toString());
	expect(vk.gamma2.y[1].toString()).toEqual(vkOnChain.gamma2.y[1].toString());
};

const users = [new Keypair(), new Keypair(), new Keypair()];

const signUpTxOpts = { gasLimit: 300000 };

const maciState = new MaciState();

// Poll parameters
const duration = 15;
const maxValues: MaxValues = {
	maxUsers: 25,
	maxMessages: 25,
	maxVoteOptions: 25,
};

const treeDepths: TreeDepths = {
	intStateTreeDepth: 1,
	messageTreeDepth: MESSAGE_TREE_DEPTH,
	messageTreeSubDepth: MESSAGE_TREE_SUBDEPTH,
	voteOptionTreeDepth: 2,
};

const messageBatchSize = 25;
const tallyBatchSize = STATE_TREE_ARITY ** treeDepths.intStateTreeDepth;

const initialVoiceCreditBalance = 100;
const signUpDuration = 100;
const deactivationPeriod = 10;
let signer;

describe('MACI', () => {
	let maciContract;
	let stateAqContract;
	let vkRegistryContract;
	let mpContract;
	let tallyContract;
	let pollId: number;

	describe('Deployment', () => {
		beforeAll(async () => {
			signer = await getDefaultSigner();

			const latestBlock = await signer.provider.getBlock('latest');
			const signUpDeadline = latestBlock.timestamp + signUpDuration;

			const r = await deployTestContracts(
				initialVoiceCreditBalance,
				signUpDeadline,
				deactivationPeriod
			);
			maciContract = r.maciContract;
			stateAqContract = r.stateAqContract;
			vkRegistryContract = r.vkRegistryContract;
			mpContract = r.mpContract;
			tallyContract = r.tallyContract;
		});

		it('MACI.stateTreeDepth should be correct', async () => {
			const std = await maciContract.stateTreeDepth();
			expect(std.toString()).toEqual(STATE_TREE_DEPTH.toString());
		});
	});

	describe('Signups', () => {
		it('should sign up users', async () => {
			expect.assertions(users.length * 2);
			const iface = maciContract.interface;

			let i = 0;
			for (const user of users) {
				const tx = await maciContract.signUp(
					user.pubKey.asContractParam(),
					ethers.utils.defaultAbiCoder.encode(['uint256'], [1]),
					ethers.utils.defaultAbiCoder.encode(['uint256'], [0]),
					signUpTxOpts
				);
				const receipt = await tx.wait();
				expect(receipt.status).toEqual(1);
				console.log('signUp() gas used:', receipt.gasUsed.toString());

				// Store the state index
				const event = iface.parseLog(receipt.logs[receipt.logs.length - 1]);
				expect(event.args._stateIndex.toString()).toEqual((i + 1).toString());

				maciState.signUp(
					user.pubKey,
					BigInt(event.args._voiceCreditBalance.toString()),
					BigInt(event.args._timestamp.toString())
				);

				i++;
			}
		});

		it('signUp() should fail when given an invalid pubkey', async () => {
			expect.assertions(1);
			try {
				await maciContract.signUp(
					{
						x: '21888242871839275222246405745257275088548364400416034343698204186575808495617',
						y: '0',
					},
					ethers.utils.defaultAbiCoder.encode(['uint256'], [1]),
					ethers.utils.defaultAbiCoder.encode(['uint256'], [0]),
					signUpTxOpts
				);
			} catch (e) {
				const error =
					"'MACI: _pubKey values should be less than the snark scalar field'";
				expect(e.message.endsWith(error)).toBeTruthy();
			}
		});

		it('signUp() should fail when signUpDeadline has passed', async () => {
			await timeTravel(signer.provider, signUpDuration);

			try {
				await maciContract.signUp(
					users[0].pubKey.asContractParam(),
					ethers.utils.defaultAbiCoder.encode(['uint256'], [1]),
					ethers.utils.defaultAbiCoder.encode(['uint256'], [0]),
					signUpTxOpts
				);
			} catch (e) {
				const error = "'MACI: the sign-up period has passed'";
				expect(e.message.endsWith(error)).toBeTruthy();
			}
		});
	});

	describe('Merging sign-ups should fail because of onlyPoll', () => {
		it('coordinator should not be able to merge the signUp AccQueue', async () => {
			try {
				await maciContract.mergeStateAqSubRoots(0, 0, { gasLimit: 3000000 });
			} catch (e) {
				const error = "'MACI: only a Poll contract can call this function'";
				expect(e.message.endsWith(error)).toBeTruthy();
			}

			try {
				await maciContract.mergeStateAq(0, { gasLimit: 3000000 });
			} catch (e) {
				const error = "'MACI: only a Poll contract can call this function'";
				expect(e.message.endsWith(error)).toBeTruthy();
			}
		});
	});

	describe('Deploy a Poll', () => {
		let deployTime;
		it('should set VKs and deploy a poll', async () => {
			const std = await maciContract.stateTreeDepth();

			// Set VKs
			console.log('Setting VKs');
			let tx = await vkRegistryContract.setVerifyingKeys(
				std.toString(),
				treeDepths.intStateTreeDepth,
				treeDepths.messageTreeDepth,
				treeDepths.voteOptionTreeDepth,
				messageBatchSize,
				testProcessVk.asContractParam(),
				testProcessDeactivationVk.asContractParam(),
				testTallyVk.asContractParam()
			);
			let receipt = await tx.wait();
			expect(receipt.status).toEqual(1);

			const pSig = await vkRegistryContract.genProcessVkSig(
				std.toString(),
				treeDepths.messageTreeDepth,
				treeDepths.voteOptionTreeDepth,
				messageBatchSize
			);

			expect(pSig.toString()).toEqual(
				genProcessVkSig(
					std,
					treeDepths.messageTreeDepth,
					treeDepths.voteOptionTreeDepth,
					messageBatchSize
				).toString()
			);

			const isPSigSet = await vkRegistryContract.isProcessVkSet(pSig);
			expect(isPSigSet).toBeTruthy();

			const tSig = await vkRegistryContract.genTallyVkSig(
				std.toString(),
				treeDepths.intStateTreeDepth,
				treeDepths.voteOptionTreeDepth
			);
			const isTSigSet = await vkRegistryContract.isTallyVkSet(tSig);
			expect(isTSigSet).toBeTruthy();

			// Check that the VKs are set
			const processVkOnChain = await vkRegistryContract.getProcessVk(
				std,
				treeDepths.messageTreeDepth,
				treeDepths.voteOptionTreeDepth,
				messageBatchSize
			);

			const tallyVkOnChain = await vkRegistryContract.getTallyVk(
				std.toString(),
				treeDepths.intStateTreeDepth,
				treeDepths.voteOptionTreeDepth
			);

			compareVks(testProcessVk, processVkOnChain);
			compareVks(testTallyVk, tallyVkOnChain);

			// Create the poll and get the poll ID from the tx event logs
			tx = await maciContract.deployPoll(
				duration,
				maxValues,
				treeDepths,
				coordinator.pubKey.asContractParam()
			);
			receipt = await tx.wait();

			const block = await signer.provider.getBlock(receipt.blockHash);
			deployTime = block.timestamp;

			console.log('deployPoll() gas used:', receipt.gasUsed.toString());

			expect(receipt.status).toEqual(1);
			const iface = maciContract.interface;
			const event = iface.parseLog(receipt.logs[receipt.logs.length - 1]);
			pollId = event.args._pollId;

			const p = maciState.deployPoll(
				duration,
				BigInt(deployTime + duration),
				maxValues,
				treeDepths,
				messageBatchSize,
				coordinator
			);
			expect(p.toString()).toEqual(pollId.toString());

			// publish the NOTHING_UP_MY_SLEEVE message
			const messageData = [NOTHING_UP_MY_SLEEVE, BigInt(0)];
			for (let i = 2; i < 10; i++) {
				messageData.push(BigInt(0));
			}
			const message = new Message(
				BigInt(MessageTypes.VOTE_MESSAGE),
				messageData
			);
			const padKey = new PubKey([
				BigInt(
					'10457101036533406547632367118273992217979173478358440826365724437999023779287'
				),
				BigInt(
					'19824078218392094440610104313265183977899662750282163392862422243483260492317'
				),
			]);
			maciState.polls[pollId].publishMessage(message, padKey);
		});

		it('should fail when attempting to init twice a Poll', async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			const pollContract = new ethers.Contract(
				pollContractAddress,
				pollAbi,
				signer
			);

			try {
				await pollContract.init();
			} catch (error) {
				expect(error).not.toBe(null);
			}
		});

		it('should set correct storage values', async () => {
			// Retrieve the Poll state and check that each value is correct
			const pollContractAddress = await maciContract.getPoll(pollId);
			const pollContract = new ethers.Contract(
				pollContractAddress,
				pollAbi,
				signer
			);

			const dd = await pollContract.getDeployTimeAndDuration();

			expect(Number(dd[0])).toEqual(deployTime);
			expect(Number(dd[1])).toEqual(duration);

			expect(await pollContract.stateAqMerged()).toBeFalsy();

			const sb = await pollContract.currentSbCommitment();
			expect(sb.toString()).toEqual('0');

			const sm = await pollContract.numSignUpsAndMessagesAndDeactivatedKeys();
			// There are 3 signups via the MACI instance
			expect(Number(sm[0])).toEqual(3);

			// There are 1 messages until a user publishes a message
			// As we enqueue the NOTHING_UP_MY_SLEEVE hash
			expect(Number(sm[1])).toEqual(1);

			const onChainMaxValues = await pollContract.maxValues();

			expect(Number(onChainMaxValues.maxMessages)).toEqual(
				maxValues.maxMessages
			);
			expect(Number(onChainMaxValues.maxVoteOptions)).toEqual(
				maxValues.maxVoteOptions
			);

			const onChainTreeDepths = await pollContract.treeDepths();
			expect(Number(onChainTreeDepths.intStateTreeDepth)).toEqual(
				treeDepths.intStateTreeDepth
			);
			expect(Number(onChainTreeDepths.messageTreeDepth)).toEqual(
				treeDepths.messageTreeDepth
			);
			expect(Number(onChainTreeDepths.messageTreeSubDepth)).toEqual(
				treeDepths.messageTreeSubDepth
			);
			expect(Number(onChainTreeDepths.voteOptionTreeDepth)).toEqual(
				treeDepths.voteOptionTreeDepth
			);

			const onChainBatchSizes = await pollContract.batchSizes();
			expect(Number(onChainBatchSizes.messageBatchSize)).toEqual(
				messageBatchSize
			);
			expect(Number(onChainBatchSizes.tallyBatchSize)).toEqual(tallyBatchSize);
		});
	});

	describe('Publish messages (vote + key-change)', () => {
		let pollContract;

		beforeAll(async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			pollContract = new ethers.Contract(pollContractAddress, pollAbi, signer);
		});

		it('should publish a message to the Poll contract', async () => {
			const keypair = new Keypair();

			const command = new PCommand(
				BigInt(1),
				keypair.pubKey,
				BigInt(0),
				BigInt(9),
				BigInt(1),
				BigInt(pollId),
				BigInt(0)
			);

			const signature = command.sign(keypair.privKey);
			const sharedKey = Keypair.genEcdhSharedKey(
				keypair.privKey,
				coordinator.pubKey
			);
			const message = command.encrypt(signature, sharedKey);
			const tx = await pollContract.publishMessage(
				message.asContractParam(),
				keypair.pubKey.asContractParam()
			);
			const receipt = await tx.wait();
			console.log('publishMessage() gas used:', receipt.gasUsed.toString());
			expect(receipt.status).toEqual(1);

			maciState.polls[pollId].publishMessage(message, keypair.pubKey);
		});

		it('shold not publish a message after the voting period', async () => {
			expect.assertions(1);
			const dd = await pollContract.getDeployTimeAndDuration();
			await timeTravel(signer.provider, Number(dd[0]) + 1);

			const keypair = new Keypair();
			const command = new PCommand(
				BigInt(0),
				keypair.pubKey,
				BigInt(0),
				BigInt(0),
				BigInt(0),
				BigInt(pollId),
				BigInt(0)
			);

			const signature = command.sign(keypair.privKey);
			const sharedKey = Keypair.genEcdhSharedKey(
				keypair.privKey,
				coordinator.pubKey
			);
			const message = command.encrypt(signature, sharedKey);
			try {
				await pollContract.publishMessage(
					message.asContractParam(),
					keypair.pubKey.asContractParam(),
					{ gasLimit: 300000 }
				);
			} catch (e) {
				const error = 'PollE01';
				expect(
					e.message.slice(0, e.message.length - 1).endsWith(error)
				).toBeTruthy();
			}
		});
	});

	describe('Merge messages', () => {
		let pollContract;
		let messageAqContract;

		beforeEach(async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			pollContract = new ethers.Contract(pollContractAddress, pollAbi, signer);

			const extContracts = await pollContract.extContracts();

			const messageAqAddress = extContracts.messageAq;
			messageAqContract = new ethers.Contract(
				messageAqAddress,
				accQueueQuinaryMaciAbi,
				signer
			);
		});

		it('should revert if subtrees are not merged for StateAq', async () => {
			try {
				await pollContract.mergeMaciStateAq(0, { gasLimit: 4000000 });
			} catch (e) {
				const error = 'PollE06';
				expect(
					e.message.slice(0, e.message.length - 1).endsWith(error)
				).toBeTruthy();
			}
		});

		it('coordinator should be able to merge the message AccQueue', async () => {
			let tx = await pollContract.mergeMessageAqSubRoots(0, {
				gasLimit: 3000000,
			});
			let receipt = await tx.wait();
			expect(receipt.status).toEqual(1);
			console.log(
				'mergeMessageAqSubRoots() gas used:',
				receipt.gasUsed.toString()
			);

			tx = await pollContract.mergeMessageAq({ gasLimit: 4000000 });
			receipt = await tx.wait();
			expect(receipt.status).toEqual(1);

			const poll = maciState.polls[pollId];
			poll.messageAq.mergeSubRoots(0);
			poll.messageAq.merge(MESSAGE_TREE_DEPTH);

			console.log('mergeMessageAq() gas used:', receipt.gasUsed.toString());
		});

		it('the message root must be correct', async () => {
			const onChainMessageRoot = await messageAqContract.getMainRoot(
				MESSAGE_TREE_DEPTH
			);
			expect(onChainMessageRoot.toString()).toEqual(
				maciState.polls[pollId].messageAq.mainRoots[
					MESSAGE_TREE_DEPTH
				].toString()
			);
		});
	});

	describe('Tally votes (negative test)', () => {
		expect.assertions(1);
		it('tallyVotes() should fail as the messages have not been processed yet', async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			try {
				await tallyContract.tallyVotes(
					pollContractAddress,
					mpContract.address,
					0,
					[0, 0, 0, 0, 0, 0, 0, 0]
				);
			} catch (e) {
				const error = "'PROCESSING_NOT_COMPLETE()'";
				expect(e.message.endsWith(error)).toBeTruthy();
			}
		});
	});

	describe('Process messages (negative test)', () => {
		// TODO: Skipped temporarely - will be addressed as part of milestone 3 as more changes are expected here.
		// Skipped as the tree is merged and negative test does not make sense at this point.
		it.skip('processMessages() should fail if the state AQ has not been merged', async () => {
			try {
				const pollContractAddress = await maciContract.getPoll(pollId);

				// Submit the proof
				await mpContract.processMessages(
					pollContractAddress,
					0,
					[0, 0, 0, 0, 0, 0, 0, 0]
				);
			} catch (e) {
				expect(e.message.endsWith("'STATE_AQ_NOT_MERGED()'")).toBeTruthy();
			}
		});
	});

	describe('Merge sign-ups as the Poll', () => {
		let pollContract;

		beforeAll(async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			pollContract = new ethers.Contract(pollContractAddress, pollAbi, signer);
		});

		// TODO: Skipped temporarely - will be addressed as part of milestone 3 as more changes are expected here.
		// Currently skipped as the tree is already merged as part  of deactivation process.
		// in Milestone 3 we need to extend the test to make sure  pollContract.mergeMaciStateAqSubRoots
		// can be called in case deactivation hasn't happened
		it.skip('The Poll should be able to merge the signUp AccQueue', async () => {
			let tx = await pollContract.mergeMaciStateAqSubRoots(0, pollId, {
				gasLimit: 3000000,
			});
			let receipt = await tx.wait();
			expect(receipt.status).toEqual(1);

			tx = await pollContract.mergeMaciStateAq(pollId, { gasLimit: 3000000 });
			receipt = await tx.wait();
			expect(receipt.status).toEqual(1);

			maciState.stateAq.mergeSubRoots(0);
			maciState.stateAq.merge(STATE_TREE_DEPTH);
		});

		// TODO: Cannot read properties of undefined (reading 'toString') maciState.stateAq.mainRoots[STATE_TREE_DEPTH].toString()
		it('the state root must be correct', async () => {
			maciState.stateAq.mergeSubRoots(0);
			maciState.stateAq.merge(STATE_TREE_DEPTH);

			const onChainStateRoot = await stateAqContract.getMainRoot(
				STATE_TREE_DEPTH
			);
			expect(onChainStateRoot.toString()).toEqual(
				maciState.stateAq.mainRoots[STATE_TREE_DEPTH].toString()
			);
		});
	});

	describe('Process messages', () => {
		let pollContract;
		let poll;
		let generatedInputs;

		beforeAll(async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			pollContract = new ethers.Contract(pollContractAddress, pollAbi, signer);

			poll = maciState.polls[pollId];
			generatedInputs = poll.processMessages(pollId);
		});

		it('genProcessMessagesPackedVals() should generate the correct value', async () => {
			const packedVals = MaciState.packProcessMessageSmallVals(
				maxValues.maxVoteOptions,
				users.length,
				0,
				poll.messages.length
			);
			const onChainPackedVals = BigInt(
				await mpContract.genProcessMessagesPackedVals(
					pollContract.address,
					0,
					users.length
				)
			);
			expect(packedVals.toString(16)).toEqual(onChainPackedVals.toString(16));
		});

		// TODO: VM Exception while processing transaction: reverted with custom error 'NO_MORE_MESSAGES()'
		it('processMessages() should update the state and ballot root commitment', async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);

			// Submit the proof
			const tx = await mpContract.processMessages(
				pollContractAddress,
				generatedInputs.newSbCommitment,
				[0, 0, 0, 0, 0, 0, 0, 0]
			);

			const receipt = await tx.wait();
			expect(receipt.status).toEqual(1);

			const processingComplete = await mpContract.processingComplete();
			expect(processingComplete).toBeTruthy();

			const onChainNewSbCommitment = await mpContract.sbCommitment();
			expect(generatedInputs.newSbCommitment).toEqual(
				onChainNewSbCommitment.toString()
			);
		});
	});

	describe('Tally votes', () => {
		let pollContract;

		beforeEach(async () => {
			const pollContractAddress = await maciContract.getPoll(pollId);
			pollContract = new ethers.Contract(pollContractAddress, pollAbi, signer);
		});

		it('genTallyVotesPackedVals() should generate the correct value', async () => {
			const onChainPackedVals = BigInt(
				await tallyContract.genTallyVotesPackedVals(
					users.length,
					0,
					tallyBatchSize
				)
			);
			const packedVals = MaciState.packTallyVotesSmallVals(
				0,
				tallyBatchSize,
				users.length
			);
			expect(onChainPackedVals.toString()).toEqual(packedVals.toString());
		});

		it('tallyVotes() should update the tally commitment', async () => {
			expect.assertions(3);
			const poll = maciState.polls[pollId];
			const generatedInputs = poll.tallyVotes(pollId);

			const pollContractAddress = await maciContract.getPoll(pollId);
			const tx = await tallyContract.tallyVotes(
				pollContractAddress,
				mpContract.address,
				generatedInputs.newTallyCommitment,
				[0, 0, 0, 0, 0, 0, 0, 0]
			);

			const receipt = await tx.wait();
			expect(receipt.status).toEqual(1);

			const onChainNewTallyCommitment = await tallyContract.tallyCommitment();

			expect(generatedInputs.newTallyCommitment).toEqual(
				onChainNewTallyCommitment.toString()
			);

			try {
				await tallyContract.tallyVotes(
					pollContractAddress,
					mpContract.address,
					generatedInputs.newTallyCommitment,
					[0, 0, 0, 0, 0, 0, 0, 0]
				);
			} catch (e) {
				const error = "'ALL_BALLOTS_TALLIED()'";
				expect(e.message.endsWith(error)).toBeTruthy();
			}
		});
	});

	describe('Generate MaciState from contract', () => {
		// TODO: Skipped temporarely - will be addressed as part of milestone 3 as more changes are expected here.
		/* TODO: assert(received)

		Expected value to be equal to:
		true
		Received:
		false

		326 |      
		327 |     public merge(_depth: number) {
		> 328 |         assert(this.subTreesMerged === true)
		*/
		it.skip('Should regenerate MaciState from on-chain information', async () => {
			const ms = await genMaciStateFromContract(
				signer.provider,
				maciContract.address,
				coordinator,
				0
			);
			// TODO: check roots
		});
	});

	describe('Key deactivation', () => {
		let keypair;
		let pollContract;
		let deactivationInstancePollId;
		let deactivationMessage;
		let deactivationMessageHash;
		let ecdsaSignature;
		let otherAccount;
		let messageAqContract;
		let deactivatedKeysAqContract;
		let mockElGamalMessage;

		beforeAll(async () => {
			const [defaultSigner, otherSigner] = await ethers.getSigners();
			// sanity check
			expect(defaultSigner.address).toEqual(signer.address);
			otherAccount = otherSigner;

			const tx = await maciContract.deployPoll(
				duration,
				maxValues,
				treeDepths,
				coordinator.pubKey.asContractParam()
			);

			const receipt = await tx.wait();
			const iface = maciContract.interface;
			const event = iface.parseLog(receipt.logs[receipt.logs.length - 1]);
			deactivationInstancePollId = event.args._pollId;
			// sanity check
			expect(Number(deactivationInstancePollId)).toEqual(Number(pollId) + 1);

			const pollContractAddress = await maciContract.getPoll(
				deactivationInstancePollId
			);
			pollContract = new ethers.Contract(pollContractAddress, pollAbi, signer);

			keypair = new Keypair();
			const command = new PCommand(
				BigInt(0),
				keypair.pubKey,
				BigInt(0),
				BigInt(0),
				BigInt(0),
				BigInt(pollId),
				BigInt(0)
			);

			const signature = command.sign(keypair.privKey);
			const sharedKey = Keypair.genEcdhSharedKey(
				keypair.privKey,
				coordinator.pubKey
			);

			deactivationMessage = command.encrypt(signature, sharedKey);

			const encodedDeactivationMessage = ethers.utils.defaultAbiCoder.encode(
				['uint256', 'uint256[]'],
				[
					deactivationMessage.asContractParam().msgType,
					deactivationMessage.asContractParam().data,
				]
			);

			deactivationMessageHash = ethers.utils.solidityKeccak256(
				['bytes'],
				[encodedDeactivationMessage]
			);

			ecdsaSignature = await signer.signMessage(
				ethers.utils.arrayify(deactivationMessageHash)
			);

			const extContracts = await pollContract.extContracts();

			const messageAqAddress = extContracts.messageAq;
			const deactivatedKeysAqAddress = extContracts.deactivatedKeysAq;

			messageAqContract = new ethers.Contract(
				messageAqAddress,
				accQueueQuinaryMaciAbi,
				signer
			);

			deactivatedKeysAqContract = new ethers.Contract(
				deactivatedKeysAqAddress,
				accQueueQuinaryMaciAbi,
				signer
			);

			let mockElGamalMessageData = [];
			for (let i = 0; i < 10; i++) {
				mockElGamalMessageData.push(BigInt(0));
			}
			mockElGamalMessage = new Message(
				BigInt(MessageTypes.DEACTIVATE_KEY),
				mockElGamalMessageData
			);
		});

		it('deactivateKey() should revert if the sender is invalid', async () => {
			try {
				await pollContract
					.connect(otherAccount)
					.deactivateKey(
						deactivationMessage.asContractParam(),
						keypair.pubKey.asContractParam()
					);
			} catch (e) {
				const error = 'PollE07'; // ERROR_INVALID_SENDER
				expect(
					e.message.slice(0, e.message.length - 1).endsWith(error)
				).toBeTruthy();
			}
		});

		it('deactivateKey() should update relevant storage variables and emit a proper event', async () => {
			const [, numMessagesBefore] =
				await pollContract.numSignUpsAndMessagesAndDeactivatedKeys();
			const numLeavesBefore = await messageAqContract.numLeaves();

			const tx = await pollContract.deactivateKey(
				deactivationMessage.asContractParam(),
				keypair.pubKey.asContractParam()
			);

			const receipt = await tx.wait();

			expect(receipt.events[0].event).toEqual('PublishMessage');
			expect(receipt.events[1].event).toEqual('AttemptKeyDeactivation');

			const [, numMessagesAfter] =
				await pollContract.numSignUpsAndMessagesAndDeactivatedKeys();
			const numLeavesAfter = await messageAqContract.numLeaves();

			expect(Number(numMessagesAfter)).toEqual(Number(numMessagesBefore) + 1);
			expect(Number(numLeavesAfter)).toEqual(Number(numLeavesBefore) + 1);
		});

		/**
		 * TODO: Uncomment this test once the isWithinDeactivationPeriod modifier is put back in
		 */
		// it('deactivateKey() should revert if it is not within the voting deadline', async () => {
		// 	const ONE_SECOND = 1;
		// 	await timeTravel(signer.provider, Number(duration) + ONE_SECOND);

		// 	try {
		// 		await pollContract.deactivateKey(
		// 			deactivationMessage.asContractParam(),
		// 			keypair.pubKey.asContractParam()
		// 		);
		// 	} catch (e) {
		// 		const error = 'PollE01'; // ERROR_VOTING_PERIOD_PASSED
		// 		expect(
		// 			e.message.slice(0, e.message.length - 1).endsWith(error)
		// 		).toBeTruthy();
		// 	}
		// });

		// TODO: Skipped temporarely - will be addressed as part of milestone 3 as more changes are expected here.
		// onlyOwner fails here because the caller is MessageProcessor and not Maci
		it.skip('confirmDeactivation() should revert if not called by an owner', async () => {
			try {
				await pollContract
					.connect(otherAccount)
					.confirmDeactivation(0, 0, mockElGamalMessage);
			} catch (e) {
				const error = 'Ownable: caller is not the owner';
				expect(
					e.message.slice(0, e.message.length - 1).endsWith(error)
				).toBeTruthy();
			}
		});
		// TODO: Skipped temporarely - will be addressed as part of milestone 3 as more changes are expected here.
		// TODO:  invalid value for array (argument="value", value=0, code=INVALID_ARGUMENT, version=contracts/5.5.0)
		it.skip('confirmDeactivation() should update relevant storage variables and emit a proper event', async () => {
			const subRoot = 0;
			const subTreeCapacity = 0;

			const [, , numDeactivatedKeysBefore] =
				await pollContract.numSignUpsAndMessagesAndDeactivatedKeys();

			const tx = await pollContract.confirmDeactivation(
				subRoot,
				subTreeCapacity,
				mockElGamalMessage
			);

			const receipt = await tx.wait();

			expect(receipt.events[0].event).toEqual('DeactivateKey');

			const [, , numDeactivatedKeysAfter] =
				await pollContract.numSignUpsAndMessagesAndDeactivatedKeys();

			expect(Number(numDeactivatedKeysAfter)).toEqual(
				Number(numDeactivatedKeysBefore) + subTreeCapacity
			);
		});
	});
});
