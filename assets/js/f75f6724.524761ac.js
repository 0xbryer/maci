"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7425],{4664:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>a,contentTitle:()=>i,default:()=>h,frontMatter:()=>c,metadata:()=>l,toc:()=>o});var n=t(5250),r=t(720);const c={title:"Testing MACI",description:"An introduction on how to test MACI",sidebar_label:"Testing",sidebar_position:11},i="Testing introduction",l={id:"testing",title:"Testing MACI",description:"An introduction on how to test MACI",source:"@site/versioned_docs/version-v1.x/testing.md",sourceDirName:".",slug:"/testing",permalink:"/docs/testing",draft:!1,unlisted:!1,editUrl:"https://github.com/privacy-scaling-explorations/maci/edit/dev/website/versioned_docs/version-v1.x/testing.md",tags:[],version:"v1.x",sidebarPosition:11,frontMatter:{title:"Testing MACI",description:"An introduction on how to test MACI",sidebar_label:"Testing",sidebar_position:11},sidebar:"version-1.x/mySidebar",previous:{title:"Trusted Setup",permalink:"/docs/trusted-setup"},next:{title:"Testing in detail",permalink:"/docs/testing-in-detail"}},a={},o=[{value:"Unit tests",id:"unit-tests",level:2},{value:"Contracts",id:"contracts",level:3},{value:"Circuits",id:"circuits",level:3},{value:"CLI",id:"cli",level:2},{value:"Download <code>.zkey</code> files or the witness generation binaries",id:"download-zkey-files-or-the-witness-generation-binaries",level:3},{value:"Compile the circuits and generate zkeys (if decided to generate from scratch)",id:"compile-the-circuits-and-generate-zkeys-if-decided-to-generate-from-scratch",level:3},{value:"Check the Rapidsnark binary",id:"check-the-rapidsnark-binary",level:3},{value:"Run CLI tests",id:"run-cli-tests",level:3},{value:"Run integration tests",id:"run-integration-tests",level:3},{value:"Pre-Compiled Artifacts for testing",id:"pre-compiled-artifacts-for-testing",level:3},{value:"Dependency (if running on intel chip and using rapidsnark)",id:"dependency-if-running-on-intel-chip-and-using-rapidsnark",level:3},{value:"Prod Size Ceremony",id:"prod-size-ceremony",level:3},{value:"Large Size",id:"large-size",level:3},{value:"Message processing",id:"message-processing",level:4},{value:"Vote tallying",id:"vote-tallying",level:4},{value:"Micro size",id:"micro-size",level:4},{value:"Message processing",id:"message-processing-1",level:4},{value:"Vote tallying",id:"vote-tallying-1",level:4},{value:"Small size",id:"small-size",level:3},{value:"Message processing",id:"message-processing-2",level:4},{value:"Vote tallying",id:"vote-tallying-2",level:4},{value:"Medium size",id:"medium-size",level:3},{value:"Message processing",id:"message-processing-3",level:4},{value:"Vote tallying",id:"vote-tallying-3",level:4},{value:"6-8-3-3",id:"6-8-3-3",level:3},{value:"Message processing",id:"message-processing-4",level:4},{value:"Vote tallying",id:"vote-tallying-4",level:4}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"testing-introduction",children:"Testing introduction"}),"\n",(0,n.jsx)(s.h2,{id:"unit-tests",children:"Unit tests"}),"\n",(0,n.jsxs)(s.p,{children:["Unit tests within the project are built using ",(0,n.jsx)(s.a,{href:"https://mochajs.org/",children:"Mocha"})," and ",(0,n.jsx)(s.a,{href:"https://www.chaijs.com/",children:"Chai"}),". Mocha is a test framework that provides the environment to write and run JavaScript tests, while Chai is an assertion library that allows us to write assertions in a more expressive and readable way."]}),"\n",(0,n.jsxs)(s.p,{children:["The following submodules contain unit tests: ",(0,n.jsx)(s.code,{children:"core"}),", ",(0,n.jsx)(s.code,{children:"crypto"}),", ",(0,n.jsx)(s.code,{children:"circuits"}),",\n",(0,n.jsx)(s.code,{children:"contracts"}),", and ",(0,n.jsx)(s.code,{children:"domainobjs"}),"."]}),"\n",(0,n.jsx)(s.p,{children:"You can run all unit tests from the root directory of the repo by running:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Or you can run unit tests within each submodule. for example to run the ",(0,n.jsx)(s.code,{children:"crypto"})," tests:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd crypto\npnpm run test\n"})}),"\n",(0,n.jsx)(s.p,{children:"You can also run individual tests within submodules, for example:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd contracts\npnpm run test:accQueue\n"})}),"\n",(0,n.jsxs)(s.p,{children:["This test command will run ",(0,n.jsx)(s.code,{children:"AccQueue.test.ts"})]}),"\n",(0,n.jsx)(s.h3,{id:"contracts",children:"Contracts"}),"\n",(0,n.jsx)(s.p,{children:"First, compile the contracts."}),"\n",(0,n.jsxs)(s.p,{children:["From the main ",(0,n.jsx)(s.code,{children:"maci/"})," directory, run:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd contracts && \\\npnpm run compileSol\n"})}),"\n",(0,n.jsx)(s.p,{children:"To run Contracts only tests, run:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test\n"})}),"\n",(0,n.jsx)(s.h3,{id:"circuits",children:"Circuits"}),"\n",(0,n.jsxs)(s.p,{children:["To test the circuits, from the main ",(0,n.jsx)(s.code,{children:"maci/"})," directory, run:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd circuits && \\\npnpm run test\n"})}),"\n",(0,n.jsxs)(s.p,{children:["Tests are run using ",(0,n.jsx)(s.a,{href:"https://mochajs.org/",children:"Mocha"})," and ",(0,n.jsx)(s.a,{href:"https://github.com/iden3/circom_tester",children:(0,n.jsx)(s.code,{children:"circom_tester"})}),"."]}),"\n",(0,n.jsx)(s.h2,{id:"cli",children:"CLI"}),"\n",(0,n.jsxs)(s.p,{children:["You can test the CLI locally. First, you need to either generate ",(0,n.jsx)(s.code,{children:".zkey"})," files,\nor download them. Please remember to not use these testing ",(0,n.jsx)(s.code,{children:".zkey"})," files in production."]}),"\n",(0,n.jsxs)(s.h3,{id:"download-zkey-files-or-the-witness-generation-binaries",children:["Download ",(0,n.jsx)(s.code,{children:".zkey"})," files or the witness generation binaries"]}),"\n",(0,n.jsxs)(s.p,{children:["MACI has two main zk-SNARK circuits, ",(0,n.jsx)(s.code,{children:"processMessages"})," and ",(0,n.jsx)(s.code,{children:"tallyVotes"})," (",(0,n.jsx)(s.code,{children:"subsidyPerBatch"})," is optional)."]}),"\n",(0,n.jsx)(s.admonition,{type:"info",children:(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"processMessages"})," and ",(0,n.jsx)(s.code,{children:"tallyVotes"})," circuits are also provided in a non-quadratic voting (non-QV) version. Currently these new versions have not undergone a trusted setup ceremony."]})}),"\n",(0,n.jsxs)(s.p,{children:["Each circuit is parameterised and there should be one\n",(0,n.jsx)(s.code,{children:".zkey"})," file for each circuit and set of parameters."]}),"\n",(0,n.jsxs)(s.p,{children:["Unless you wish to generate a fresh set of ",(0,n.jsx)(s.code,{children:".zkey"})," files, you should obtain\nthem from someone who has performed a multi-party trusted setup for said\ncircuits."]}),"\n",(0,n.jsxs)(s.p,{children:["Note the locations of the ",(0,n.jsx)(s.code,{children:".zkey"})," files as the CLI requires them as\ncommand-line flags."]}),"\n",(0,n.jsxs)(s.p,{children:["For testing purposes you can download the required artifacts using the ",(0,n.jsx)(s.a,{href:"https://github.com/privacy-scaling-explorations/maci/blob/dev/integrationTests/scripts/download_zkeys.sh",children:(0,n.jsx)(s.code,{children:"download_zkeys"})})," script inside the ",(0,n.jsx)(s.code,{children:"integrationTests/scripts"})," folder. The script will place all required artifacts inside the ",(0,n.jsx)(s.code,{children:"cli/zkeys"})," folder.\nYou can run the script directly with bash or use pnpm: ",(0,n.jsx)(s.code,{children:"pnpm run download:test-zkeys"})," from the monorepo root."]}),"\n",(0,n.jsx)(s.h3,{id:"compile-the-circuits-and-generate-zkeys-if-decided-to-generate-from-scratch",children:"Compile the circuits and generate zkeys (if decided to generate from scratch)"}),"\n",(0,n.jsx)(s.p,{children:"From the root folder, run:"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"for c++ witness generator"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm build:circuits-c\n"})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"for wasm witness generator"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm build:circuits-wasm\n"})}),"\n",(0,n.jsxs)(s.p,{children:["You should see the following files in ",(0,n.jsx)(s.code,{children:"maci/cli/"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"zkeys/\nzkeys/TallyVotes_10-1-2_test/\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.sym\nzkeys/TallyVotes_10-1-2_test/groth16_vkey.json\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.r1cs\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/calcwit.cpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/circom.hpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/fr.o\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test.o\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/main.o\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/calcwit.o\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/fr.hpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/Makefile\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/fr.asm\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test.dat\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/fr_asm.o\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/main.cpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test.cpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/fr.cpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/calcwit.hpp\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/generate_witness.js\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/witness_calculator.js\nzkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test.0.zkey\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/calcwit.cpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/circom.hpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/fr.o\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/ProcessMessagesNonQv_10-2-1-2_test.dat\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/ProcessMessagesNonQv_10-2-1-2_test\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/ProcessMessagesNonQv_10-2-1-2_test.o\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/main.o\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/calcwit.o\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/fr.hpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/Makefile\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/fr.asm\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/fr_asm.o\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/main.cpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/fr.cpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/calcwit.hpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/ProcessMessagesNonQv_10-2-1-2_test.cpp\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test.sym\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/groth16_vkey.json\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test.r1cs\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_js/\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_js/generate_witness.js\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_js/witness_calculator.js\nzkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_js/ProcessMessagesNonQv_10-2-1-2_test.wasm\nzkeys/processMessages_6-8-2-3/\nzkeys/powersOfTau28_hez_final_19.ptau\nzkeys/TallyVotesNonQv_10-1-2_test/\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/calcwit.cpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/circom.hpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/fr.o\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/main.o\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/calcwit.o\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/fr.hpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/TallyVotesNonQv_10-1-2_test\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/Makefile\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/fr.asm\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/TallyVotesNonQv_10-1-2_test.o\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/fr_asm.o\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/TallyVotesNonQv_10-1-2_test.cpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/main.cpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/TallyVotesNonQv_10-1-2_test.dat\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/fr.cpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/calcwit.hpp\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_js/\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_js/TallyVotesNonQv_10-1-2_test.wasm\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_js/generate_witness.js\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_js/witness_calculator.js\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test.sym\nzkeys/TallyVotesNonQv_10-1-2_test/groth16_vkey.json\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test.r1cs\nzkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test.0.zkey\nzkeys/ProcessMessages_10-2-1-2_test/\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/generate_witness.js\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/witness_calculator.js\nzkeys/ProcessMessages_10-2-1-2_test/groth16_vkey.json\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.r1cs\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.sym\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/calcwit.cpp\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/circom.hpp\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/fr.o\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test.o\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test.cpp\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/main.o\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/calcwit.o\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/fr.hpp\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/Makefile\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/fr.asm\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/fr_asm.o\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/main.cpp\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test.dat\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/fr.cpp\nzkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/calcwit.hpp\nzkeys/powersOfTau28_hez_final_17.ptau\nzkeys/SubsidyPerBatch_10-1-2_test/\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test.sym\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test.0.zkey\nzkeys/SubsidyPerBatch_10-1-2_test/groth16_vkey.json\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test.r1cs\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_js/\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_js/generate_witness.js\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_js/witness_calculator.js\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_js/SubsidyPerBatch_10-1-2_test.wasm\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/calcwit.cpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/circom.hpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/fr.o\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/SubsidyPerBatch_10-1-2_test.dat\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/main.o\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/SubsidyPerBatch_10-1-2_test.cpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/calcwit.o\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/fr.hpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/Makefile\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/fr.asm\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/fr_asm.o\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/main.cpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/fr.cpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/SubsidyPerBatch_10-1-2_test.o\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/calcwit.hpp\nzkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/SubsidyPerBatch_10-1-2_test\n"})}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"generate zkeys"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm setup:zkeys\n"})}),"\n",(0,n.jsx)(s.h3,{id:"check-the-rapidsnark-binary",children:"Check the Rapidsnark binary"}),"\n",(0,n.jsxs)(s.p,{children:["Next, ensure that the ",(0,n.jsx)(s.code,{children:"prover"})," binary of ",(0,n.jsx)(s.code,{children:"rapidsnark"})," is in\n",(0,n.jsx)(s.code,{children:"~/rapidsnark/build/prover"}),"."]}),"\n",(0,n.jsx)(s.admonition,{type:"info",children:(0,n.jsxs)(s.p,{children:["This step is only required if you wish to use rapidsnark, for faster proof generation. You can also use the WASM witnesses provided in the ",(0,n.jsx)(s.code,{children:"cli/zkeys"})," folder."]})}),"\n",(0,n.jsx)(s.h3,{id:"run-cli-tests",children:"Run CLI tests"}),"\n",(0,n.jsxs)(s.p,{children:["You can find the tests in ",(0,n.jsx)(s.code,{children:"maci/cli/tests"}),"."]}),"\n",(0,n.jsx)(s.p,{children:"To run the tests first start a hardhat node in the background:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd contracts\npnpm run hardhat &\ncd ../cli\n"})}),"\n",(0,n.jsx)(s.p,{children:"Then run the tests (this will run all tests):"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test\n"})}),"\n",(0,n.jsx)(s.p,{children:"To run e2e without subsidy:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test:e2e\n"})}),"\n",(0,n.jsx)(s.p,{children:"To run e2e with subsidy:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test:e2e-subsidy\n"})}),"\n",(0,n.jsx)(s.p,{children:"To run e2e tests with normal voting (not quadratic voting):"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test:e2e-non-qv\n"})}),"\n",(0,n.jsx)(s.h3,{id:"run-integration-tests",children:"Run integration tests"}),"\n",(0,n.jsxs)(s.p,{children:["You can find the tests in ",(0,n.jsx)(s.code,{children:"maci/integrationTests/"}),"."]}),"\n",(0,n.jsx)(s.p,{children:"You can run them with:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"pnpm run test\n"})}),"\n",(0,n.jsx)(s.h3,{id:"pre-compiled-artifacts-for-testing",children:"Pre-Compiled Artifacts for testing"}),"\n",(0,n.jsx)(s.p,{children:"The following compiled circuits and zkeys are available to download:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"#prod-size-ceremony",children:"Prod && Ceremony"})," (",(0,n.jsx)(s.code,{children:"6-8-2-3"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"#large-size",children:"Large"})," (",(0,n.jsx)(s.code,{children:"7-9-3-4"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"#micro-size",children:"Micro"})," (",(0,n.jsx)(s.code,{children:"10-2-1-2"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"#small-size",children:"Small"})," (",(0,n.jsx)(s.code,{children:"4-6-3-4"}),")"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"#medium-size",children:"Medium"})," (",(0,n.jsx)(s.code,{children:"7-7-3-3"}),")"]}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"#6-8-3-3",children:"6-8-3-3"})}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"dependency-if-running-on-intel-chip-and-using-rapidsnark",children:"Dependency (if running on intel chip and using rapidsnark)"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"glibc 2.11 (Default of Ubuntu 20.04 LTS)"}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"prod-size-ceremony",children:"Prod Size Ceremony"}),"\n",(0,n.jsx)(s.admonition,{type:"info",children:(0,n.jsx)(s.p,{children:"These artifacts have undergong a trusted setup and can be used in production. Subsidy is not included."})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.2.0/maci-ceremony-artifacts-v1.2.0.tar.gz",children:"maci-ceremony-artifacts-v1.2.0.tar.gz"})," (0.76 GB)"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"large-size",children:"Large Size"}),"\n",(0,n.jsx)(s.admonition,{type:"danger",children:(0,n.jsx)(s.p,{children:"Please do not use in production. These artifacts have not undergone a trusted setup."})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/7-9-3-4/zkeys_7-9-3-4_glibc-211.tar.gz",children:"zkeys-7-9-3-4.tar.gz"})," (2.8 GB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/7-9-3-4/ProcessMessages_7-9-3-4_test.0.zkey",children:"ProcessMessages_7-9-3-4_test.0.zkey"})," (3.8 GB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_22.ptau"})]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/7-9-3-4/TallyVotes_7-3-4_test.0.zkey",children:"TallyVotes_7-3-4_test.0.zkey"})," (8.5 GB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_23.ptau"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"message-processing",children:"Message processing"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"7"}),(0,n.jsx)(s.td,{children:"Allows 78,125 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message tree depth"}),(0,n.jsx)(s.td,{children:"9"}),(0,n.jsx)(s.td,{children:"Allows 1,953,125 votes or key-change messages."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message batch tree depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 messages to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"4"}),(0,n.jsx)(s.td,{children:"Allows 625 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"vote-tallying",children:"Vote tallying"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"7"}),(0,n.jsx)(s.td,{children:"Allows 78,125 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State leaf batch depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 user's votes to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"4"}),(0,n.jsx)(s.td,{children:"Allows 625 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"micro-size",children:"Micro size"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/10-2-1-2/zkeys_10-2-1-2_glibc-211.tar.gz",children:"zkeys_10-2-1-2_glibc-211.tar.gz"})," (403 MB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/10-2-1-2/ProcessMessages_10-2-1-2_test.0.zkey",children:"ProcessMessages_10-2-1-2_test.0.zkey"})," (190 MB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/10-2-1-2/TallyVotes_10-1-2_test.0.zkey",children:"TallyVotes_10-1-2_test.0.zkey"})," (71 MB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/10-2-1-2/SubsidyPerBatch_10-1-2_test.0.zkey",children:"SubsidyPerBatch_10-1-2_test.0.zkey"})," (202 MB)"]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"*.zkey"})," files are generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_20.ptau"})]}),"\n",(0,n.jsx)(s.h4,{id:"message-processing-1",children:"Message processing"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"10"}),(0,n.jsx)(s.td,{children:"Allows 9,765,625 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message tree depth"}),(0,n.jsx)(s.td,{children:"2"}),(0,n.jsx)(s.td,{children:"Allows 25 votes or key-change messages."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message batch tree depth"}),(0,n.jsx)(s.td,{children:"1"}),(0,n.jsx)(s.td,{children:"Allows 5 messages to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"2"}),(0,n.jsx)(s.td,{children:"Allows 25 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"vote-tallying-1",children:"Vote tallying"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"10"}),(0,n.jsx)(s.td,{children:"Allows 9,765,625 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State leaf batch depth"}),(0,n.jsx)(s.td,{children:"1"}),(0,n.jsx)(s.td,{children:"Allows 5 user's votes to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"2"}),(0,n.jsx)(s.td,{children:"Allows 25 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h3,{id:"small-size",children:"Small size"}),"\n",(0,n.jsx)(s.admonition,{type:"danger",children:(0,n.jsx)(s.p,{children:"Please do not use in production. These artifacts have not undergone a trusted setup."})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/4-6-3-4/zkeys_4-6-3-4_glibc-211.tar.gz",children:"zkeys_4-6-3-4_glibc-211.tar.gz"})," (2.6 GB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/4-6-3-4/ProcessMessages_4-6-3-4_test.0.zkey",children:"ProcessMessages_4-6-3-4_test.0.zkey"})," (2.9 GB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_22.ptau"})]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/4-6-3-4/TallyVotes_4-3-4_test.0.zkey",children:"TallyVotes_4-3-4_test.0.zkey"})," (8.5 GB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_23.ptau"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"message-processing-2",children:"Message processing"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"4"}),(0,n.jsx)(s.td,{children:"Allows 625 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message tree depth"}),(0,n.jsx)(s.td,{children:"6"}),(0,n.jsx)(s.td,{children:"Allows 15,625 votes or key-change messages."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message batch tree depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 messages to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"4"}),(0,n.jsx)(s.td,{children:"Allows 625 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"vote-tallying-2",children:"Vote tallying"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"4"}),(0,n.jsx)(s.td,{children:"Allows 9,765,625 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State leaf batch depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 user's votes to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"2"}),(0,n.jsx)(s.td,{children:"Allows 25 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h3,{id:"medium-size",children:"Medium size"}),"\n",(0,n.jsx)(s.admonition,{type:"danger",children:(0,n.jsx)(s.p,{children:"Please do not use in production. These artifacts have not undergone a trusted setup."})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/7-7-3-3/zkeys_7-7-3-3_glibc-211.tar.gz",children:"zkeys_7-7-3-3_glibc-211.tar.gz"})," (4.9 GB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/7-7-3-3/ProcessMessages_7-7-3-3_test.0.zkey",children:"ProcessMessages_7-7-3-3_test.0.zkey"})," (2.2 GB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_22.ptau"})]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/7-7-3-3/TallyVotes_7-3-3_test.0.zkey",children:"TallyVotes_7-3-3_test.0.zkey"})," (884 MB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_22.ptau"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"message-processing-3",children:"Message processing"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"7"}),(0,n.jsx)(s.td,{children:"Allows 78,125 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message tree depth"}),(0,n.jsx)(s.td,{children:"7"}),(0,n.jsx)(s.td,{children:"Allows 78,125 votes or key-change messages."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message batch tree depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 messages to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"vote-tallying-3",children:"Vote tallying"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"7"}),(0,n.jsx)(s.td,{children:"Allows 78,125 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State leaf batch depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 user's votes to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"2"}),(0,n.jsx)(s.td,{children:"Allows 25 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h3,{id:"6-8-3-3",children:"6-8-3-3"}),"\n",(0,n.jsx)(s.admonition,{type:"danger",children:(0,n.jsx)(s.p,{children:"Please do not use in production. These artifacts have not undergone a trusted setup."})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/6-8-3-3/zkeys_6-8-3-3_glibc-211.tar.gz",children:"zkeys_6-8-3-3_glibc-211.tar.gz"})," (1.1 GB)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/6-8-3-3/ProcessMessages_6-8-3-3_test.0.zkey",children:"ProcessMessages_6-8-3-3_test.0.zkey"})," (3.4 GB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_22.ptau"})]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://maci-develop-fra.s3.eu-central-1.amazonaws.com/v1.1.1-aa4ba27/6-8-3-3/TallyVotes_6-3-3_test.0.zkey",children:"TallyVotes_6-3-3_test.0.zkey"})," (1.8 MB)","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["generated using ",(0,n.jsx)(s.code,{children:"powersOfTau28_hez_final_22.ptau"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h4,{id:"message-processing-4",children:"Message processing"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"6"}),(0,n.jsx)(s.td,{children:"Allows 15,625 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message tree depth"}),(0,n.jsx)(s.td,{children:"8"}),(0,n.jsx)(s.td,{children:"Allows 390,625 votes or key-change messages."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Message batch tree depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 messages to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 vote options."})]})]})]}),"\n",(0,n.jsx)(s.h4,{id:"vote-tallying-4",children:"Vote tallying"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Parameter"}),(0,n.jsx)(s.th,{children:"Value"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State tree depth"}),(0,n.jsx)(s.td,{children:"6"}),(0,n.jsx)(s.td,{children:"Allows 15,625 signups."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"State leaf batch depth"}),(0,n.jsx)(s.td,{children:"3"}),(0,n.jsx)(s.td,{children:"Allows 125 user's votes to be processed per batch."})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vote option tree depth"}),(0,n.jsx)(s.td,{children:"2"}),(0,n.jsx)(s.td,{children:"Allows 25 vote options."})]})]})]})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},720:(e,s,t)=>{t.d(s,{Z:()=>l,a:()=>i});var n=t(79);const r={},c=n.createContext(r);function i(e){const s=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(c.Provider,{value:s},e.children)}}}]);