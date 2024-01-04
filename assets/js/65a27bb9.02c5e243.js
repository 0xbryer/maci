"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9906],{6085:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>r,default:()=>o,frontMatter:()=>d,metadata:()=>l,toc:()=>h});var i=t(5893),n=t(1151);const d={},r="CommonUtilities",l={id:"solidity-docs/utilities/Utilities",title:"CommonUtilities",description:"A contract that holds common utilities",source:"@site/versioned_docs/version-v1.x/solidity-docs/utilities/Utilities.md",sourceDirName:"solidity-docs/utilities",slug:"/solidity-docs/utilities/",permalink:"/docs/solidity-docs/utilities/",draft:!1,unlisted:!1,editUrl:"https://github.com/privacy-scaling-explorations/maci/edit/dev/website/versioned_docs/version-v1.x/solidity-docs/utilities/Utilities.md",tags:[],version:"v1.x",frontMatter:{},sidebar:"version-1.x/mySidebar",previous:{title:"EmptyBallotRoots",permalink:"/docs/solidity-docs/trees/EmptyBallotRoots"},next:{title:"DomainObjs",permalink:"/docs/solidity-docs/utilities/DomainObjs"}},a={},h=[{value:"VOTING_PERIOD_NOT_PASSED",id:"voting_period_not_passed",level:3},{value:"_votingPeriodOver",id:"_votingperiodover",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Utilities",id:"utilities",level:2},{value:"hashStateLeaf",id:"hashstateleaf",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Return Values",id:"return-values",level:4},{value:"padAndHashMessage",id:"padandhashmessage",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Return Values",id:"return-values-1",level:4},{value:"hashMessageAndEncPubKey",id:"hashmessageandencpubkey",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Return Values",id:"return-values-2",level:4}];function c(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"commonutilities",children:"CommonUtilities"}),"\n",(0,i.jsx)(s.p,{children:"A contract that holds common utilities\nwhich are to be used by multiple contracts\nnamely Subsidy, Tally and MessageProcessor"}),"\n",(0,i.jsx)(s.h3,{id:"voting_period_not_passed",children:"VOTING_PERIOD_NOT_PASSED"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-solidity",children:"error VOTING_PERIOD_NOT_PASSED()\n"})}),"\n",(0,i.jsx)(s.h3,{id:"_votingperiodover",children:"_votingPeriodOver"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-solidity",children:"function _votingPeriodOver(contract Poll _poll) internal view\n"})}),"\n",(0,i.jsx)(s.p,{children:"common function for MessageProcessor, Tally and Subsidy"}),"\n",(0,i.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsx)(s.tbody,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"_poll"}),(0,i.jsx)(s.td,{children:"contract Poll"}),(0,i.jsx)(s.td,{children:"the poll to be checked"})]})})]}),"\n",(0,i.jsx)(s.h2,{id:"utilities",children:"Utilities"}),"\n",(0,i.jsx)(s.p,{children:"An utility contract that can be used to:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"hash a state leaf"}),"\n",(0,i.jsx)(s.li,{children:"pad and hash a MACI message"}),"\n",(0,i.jsx)(s.li,{children:"hash a MACI message and an encryption public key"}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"hashstateleaf",children:"hashStateLeaf"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-solidity",children:"function hashStateLeaf(struct DomainObjs.StateLeaf _stateLeaf) public pure returns (uint256 ciphertext)\n"})}),"\n",(0,i.jsx)(s.p,{children:"An utility function used to hash a state leaf"}),"\n",(0,i.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsx)(s.tbody,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"_stateLeaf"}),(0,i.jsx)(s.td,{children:"struct DomainObjs.StateLeaf"}),(0,i.jsx)(s.td,{children:"the state leaf to be hashed"})]})})]}),"\n",(0,i.jsx)(s.h4,{id:"return-values",children:"Return Values"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsx)(s.tbody,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"ciphertext"}),(0,i.jsx)(s.td,{children:"uint256"}),(0,i.jsx)(s.td,{children:"The hash of the state leaf"})]})})]}),"\n",(0,i.jsx)(s.h3,{id:"padandhashmessage",children:"padAndHashMessage"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-solidity",children:"function padAndHashMessage(uint256[2] dataToPad, uint256 msgType) public pure returns (struct DomainObjs.Message message, struct DomainObjs.PubKey padKey, uint256 msgHash)\n"})}),"\n",(0,i.jsx)(s.p,{children:"An utility function used to pad and hash a MACI message"}),"\n",(0,i.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"dataToPad"}),(0,i.jsx)(s.td,{children:"uint256[2]"}),(0,i.jsx)(s.td,{children:"the data to be padded"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"msgType"}),(0,i.jsx)(s.td,{children:"uint256"}),(0,i.jsx)(s.td,{children:"the type of the message"})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"return-values-1",children:"Return Values"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"message"}),(0,i.jsx)(s.td,{children:"struct DomainObjs.Message"}),(0,i.jsx)(s.td,{children:"The padded message"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"padKey"}),(0,i.jsx)(s.td,{children:"struct DomainObjs.PubKey"}),(0,i.jsx)(s.td,{children:"The padding public key"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"msgHash"}),(0,i.jsx)(s.td,{children:"uint256"}),(0,i.jsx)(s.td,{children:"The hash of the padded message and encryption key"})]})]})]}),"\n",(0,i.jsx)(s.h3,{id:"hashmessageandencpubkey",children:"hashMessageAndEncPubKey"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-solidity",children:"function hashMessageAndEncPubKey(struct DomainObjs.Message _message, struct DomainObjs.PubKey _encPubKey) public pure returns (uint256 msgHash)\n"})}),"\n",(0,i.jsx)(s.p,{children:"An utility function used to hash a MACI message and an encryption public key"}),"\n",(0,i.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"_message"}),(0,i.jsx)(s.td,{children:"struct DomainObjs.Message"}),(0,i.jsx)(s.td,{children:"the message to be hashed"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"_encPubKey"}),(0,i.jsx)(s.td,{children:"struct DomainObjs.PubKey"}),(0,i.jsx)(s.td,{children:"the encryption public key to be hashed"})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"return-values-2",children:"Return Values"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"Name"}),(0,i.jsx)(s.th,{children:"Type"}),(0,i.jsx)(s.th,{children:"Description"})]})}),(0,i.jsx)(s.tbody,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:"msgHash"}),(0,i.jsx)(s.td,{children:"uint256"}),(0,i.jsx)(s.td,{children:"The hash of the message and the encryption public key"})]})})]})]})}function o(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,s,t)=>{t.d(s,{Z:()=>l,a:()=>r});var i=t(7294);const n={},d=i.createContext(n);function r(e){const s=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(d.Provider,{value:s},e.children)}}}]);