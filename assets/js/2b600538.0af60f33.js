"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4083],{9673:(t,e,s)=>{s.r(e),s.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>n,metadata:()=>u,toc:()=>a});var r=s(5893),o=s(1151);const n={title:"MACI Trusted Setup",description:"Introduction to the MACI multi-party trusted setup",sidebar_label:"Trusted Setup",sidebar_position:7},i="Trusted setup",u={id:"v1.x/trusted-setup",title:"MACI Trusted Setup",description:"Introduction to the MACI multi-party trusted setup",source:"@site/docs/v1.x/trusted-setup.md",sourceDirName:"v1.x",slug:"/v1.x/trusted-setup",permalink:"/maci/docs/v1.x/trusted-setup",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/v1.x/trusted-setup.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{title:"MACI Trusted Setup",description:"Introduction to the MACI multi-party trusted setup",sidebar_label:"Trusted Setup",sidebar_position:7},sidebar:"docSidebar",previous:{title:"Testing",permalink:"/maci/docs/v1.x/testing"},next:{title:"Integrating",permalink:"/maci/docs/v1.x/integrating"}},c={},a=[{value:"How to run the trusted setup",id:"how-to-run-the-trusted-setup",level:2}];function d(t){const e={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...(0,o.a)(),...t.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"trusted-setup",children:"Trusted setup"}),"\n",(0,r.jsxs)(e.p,{children:["MACI currently uses Groth16 zk-SNARKs written in ",(0,r.jsx)(e.code,{children:"circom"}),". Teams who wish to\nbuild on MACI may choose to perform a multi-party trusted setup. This allows\nobservers to have a higher degree of confidence that the coordinator cannot\ngenerate fake proofs. Some teams, however, may forgo the trusted setup."]}),"\n",(0,r.jsx)(e.p,{children:"There are two possible reasons for doing so: if a team does not intend\nto manage a large amount of value, and if their users accept that the risk of\ncoordinator misbehaviour is insufficient to justify doing the work nof a\ntrusted setup. After all, MACI's security model presumes a trusted coordinator."}),"\n",(0,r.jsxs)(e.p,{children:["In any case, MACI can be relatively easily modified to support PLONK, which\ndoes not require a circuit-specific trusted setup. Its circuits, written in\n",(0,r.jsx)(e.a,{href:"https://github.com/iden3/circom",children:(0,r.jsx)(e.code,{children:"circom"})}),", are compatible with Fluidex's\n",(0,r.jsx)(e.a,{href:"https://github.com/Fluidex/plonkit",children:(0,r.jsx)(e.code,{children:"plonkit"})})," tool. The downside to using\nPLONK is that proof generation is not as optimised as it is for Groth16."]}),"\n",(0,r.jsx)(e.h2,{id:"how-to-run-the-trusted-setup",children:"How to run the trusted setup"}),"\n",(0,r.jsxs)(e.p,{children:["First, follow the instructions in the ",(0,r.jsx)(e.a,{href:"./installation",children:"Installation"}),"\nsection to install dependencies for MACI."]}),"\n",(0,r.jsxs)(e.p,{children:["Next, configure and compile circuits following instructions in\n",(0,r.jsx)(e.a,{href:"./circuits",children:"Circuits"}),"."]}),"\n",(0,r.jsxs)(e.p,{children:["Finally, use the ",(0,r.jsx)(e.a,{href:"https://github.com/privacy-scaling-explorations/multisetups",children:(0,r.jsx)(e.code,{children:"multisetups"})}),"\ntool to do this."]}),"\n",(0,r.jsx)(e.p,{children:"You should perform at least one contribution to each circuit, even if you\nchoose not to perform a multi-party trusted setup."}),"\n",(0,r.jsxs)(e.p,{children:["We don't recommend a browser-based trusted setup (which ",(0,r.jsx)(e.a,{href:"https://ceremony.tornado.cash/",children:"Tornado\nCash"})," and ",(0,r.jsx)(e.a,{href:"https://mpc.zkopru.network/",children:"Zkopru"}),"\nused) for the MACI circuits as they are too large to be feasibly processed in\nthe browser."]})]})}function h(t={}){const{wrapper:e}={...(0,o.a)(),...t.components};return e?(0,r.jsx)(e,{...t,children:(0,r.jsx)(d,{...t})}):d(t)}},1151:(t,e,s)=>{s.d(e,{Z:()=>u,a:()=>i});var r=s(7294);const o={},n=r.createContext(o);function i(t){const e=r.useContext(n);return r.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function u(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:i(t.components),r.createElement(n.Provider,{value:e},t.children)}}}]);