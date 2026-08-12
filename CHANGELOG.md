## [4.3.0](https://github.com/mohammaDJ23/expense-api/compare/v4.2.9...v4.3.0) (2026-08-12)

### ✨ Features

- 865711 add the search sync api ([763ea4d](https://github.com/mohammaDJ23/expense-api/commit/763ea4dc10c117d4375ace94b7ea454df628eb18))

### 🔧 Chores

- 865711 add the search sync for bill ([dc8befd](https://github.com/mohammaDJ23/expense-api/commit/dc8befdabe7c15d74c3723432b140904e2c59ac0))
- 865711 add the search sync for consumer ([eabfd59](https://github.com/mohammaDJ23/expense-api/commit/eabfd59a44071792e712f06489a21f4413ef1fa7))
- 865711 add the search sync for location ([c13d261](https://github.com/mohammaDJ23/expense-api/commit/c13d2612c169da87a05f1769e0588788006cf016))
- 865711 add the search sync for receiver ([d66e858](https://github.com/mohammaDJ23/expense-api/commit/d66e8586819f4d8bda0e1d19e43e4d73c43e8d5a))

## [4.2.9](https://github.com/mohammaDJ23/expense-api/compare/v4.2.8...v4.2.9) (2026-08-11)

### ♻️ Code Refactoring

- 816381 localize the excel export logics ([abef1ba](https://github.com/mohammaDJ23/expense-api/commit/abef1bab7df929ff7037530af5c3ae70159e2d82))
- 816381 move export to features ([b5c935c](https://github.com/mohammaDJ23/expense-api/commit/b5c935c709811a9c5ae88a624f1090b482e26aab))
- 816381 move list types to the related folder ([22bf3e6](https://github.com/mohammaDJ23/expense-api/commit/22bf3e6ebd73758d6022f1975dd55b0d1d17da35))
- 816381 move out all excel exports inside excel file ([83d6b07](https://github.com/mohammaDJ23/expense-api/commit/83d6b07d8af51f5ebca9486054f30fa950b66ab0))
- 816381 move out all write logics ([de41000](https://github.com/mohammaDJ23/expense-api/commit/de410000efd20a5ebe1b101053cfd6990c0f083f))
- 816381 move the jobs into related folder ([63950fc](https://github.com/mohammaDJ23/expense-api/commit/63950fce1e3a561b79301c535fffdbd7d4284e2d))
- 816381 remove the dangerous queries ([bae6c82](https://github.com/mohammaDJ23/expense-api/commit/bae6c820fb50b960e2c07f21468f350f5081a10b))
- 816381 rename constant to constants ([4de91f8](https://github.com/mohammaDJ23/expense-api/commit/4de91f88ad0a6fbc4a78ab98c8458a9fb77abaa3))
- 816381 rename cursor to pagination ([7a51656](https://github.com/mohammaDJ23/expense-api/commit/7a516564695c8d5fc3e63ccda664282436919991))
- 816381 rename the serivces of export ([255f87d](https://github.com/mohammaDJ23/expense-api/commit/255f87d16dee8cc1fec7c9ba821572c5c986f773))
- 816381 update the methods of generator of export ([e7c71df](https://github.com/mohammaDJ23/expense-api/commit/e7c71df3b9b5df44b0ddf4cdcc360c917e61279b))
- 816381 use the cursor and pagination for creating bills export ([19248b9](https://github.com/mohammaDJ23/expense-api/commit/19248b970a8b30f8c5a23491850b626a7f90ed15))

### 🔧 Chores

- 816381 add cursorIterator ([2aa5347](https://github.com/mohammaDJ23/expense-api/commit/2aa53471c3da2885a9743daf2eff7c7e6ec797c7))
- 816381 add IExportContext ([c620338](https://github.com/mohammaDJ23/expense-api/commit/c62033817e83523a4339581fa37aadb4b6f6c061))
- 816381 add IStream ([ed88971](https://github.com/mohammaDJ23/expense-api/commit/ed88971cd92b8b31cee029dc5743f5d8eadbcbf1))
- 816381 add the related cursor logic ([f62253e](https://github.com/mohammaDJ23/expense-api/commit/f62253e44567c1e21044899da7e9692976fa47bc))
- 816381 add the user metadata sheet ([cb31291](https://github.com/mohammaDJ23/expense-api/commit/cb3129183b39e86919561bb3bdd27b18a6b968c0))
- 816381 add toHeader ([4fd5572](https://github.com/mohammaDJ23/expense-api/commit/4fd5572c44578f04a0651c254824b4b279f10493))
- 816381 convert the default limit and offset list logic to cursor ([652f701](https://github.com/mohammaDJ23/expense-api/commit/652f70163c53167d0fb6e5e982ed81849d2275e1))
- 816381 convert the default limit and offset list logic to cursor ([227b0dd](https://github.com/mohammaDJ23/expense-api/commit/227b0ddfe4dd872c081c0458f49459a22a4e07c6))
- 816381 convert the default limit and offset list logic to cursor ([9d98530](https://github.com/mohammaDJ23/expense-api/commit/9d985300b0b282ebf101291689cf291d6275743d))
- 816381 convert the default limit and offset list logic to cursor ([4261e79](https://github.com/mohammaDJ23/expense-api/commit/4261e79bd170c60716fd50e5519b0234f8a079e3))
- 816381 convert the default limit and offset list logic to cursor ([2457f06](https://github.com/mohammaDJ23/expense-api/commit/2457f0619352be604c6ebb48372d2810e765aaef))
- 816381 define the utility of export for the naming ([b931f62](https://github.com/mohammaDJ23/expense-api/commit/b931f62a9ae9837ff4c95ecbd5bcf0999a15fcf7))
- 816381 export FindUserListService ([6644962](https://github.com/mohammaDJ23/expense-api/commit/6644962a85aedffdd080b986c5455a206ba5ed7f))
- 816381 ignore no-await-in-loop ([7bcb581](https://github.com/mohammaDJ23/expense-api/commit/7bcb58121ba17f480096adb090398d75e9f6174b))
- 816381 update the excel generator logic ([9cecca2](https://github.com/mohammaDJ23/expense-api/commit/9cecca2a997aee0c7879f244b8fd54d2fe5bc9a6))

## [4.2.8](https://github.com/mohammaDJ23/expense-api/compare/v4.2.7...v4.2.8) (2026-08-08)

### ♻️ Code Refactoring

- 775606 move out accessToken logic into related folder ([e5e5527](https://github.com/mohammaDJ23/expense-api/commit/e5e5527e4afde7936c048c673c879f72ba26080e))
- 775606 move out the guard to authorization folder ([5b8ff29](https://github.com/mohammaDJ23/expense-api/commit/5b8ff29cbc5a28bbdc5864a8f1478970e3e890df))

### 🔧 Chores

- 553939 add a query to find all bills by user id ([6fd12b9](https://github.com/mohammaDJ23/expense-api/commit/6fd12b9693acd80c668da491ddaab234225397de))
- 553939 add the bill excel generator ([5ad5802](https://github.com/mohammaDJ23/expense-api/commit/5ad58022dff03e017bc3c0e440e215c5259f5355))
- 553939 add the bill export job ([681af97](https://github.com/mohammaDJ23/expense-api/commit/681af97fb5f3dc9a5330e30291499e1de45fdc18))
- 553939 add the bills export orchestrator service ([9995d86](https://github.com/mohammaDJ23/expense-api/commit/9995d8621b0ec4879598eb7b3ae17163612f35ad))
- 553939 add the data loader service ([20e21a2](https://github.com/mohammaDJ23/expense-api/commit/20e21a2b8643ce595164a91a7be7088d74c9d146))
- 553939 add the exceljs package ([733f682](https://github.com/mohammaDJ23/expense-api/commit/733f682dc7dbe54ed36fa157348dca37e635cc23))
- 553939 add the find many users query ([d77e7e1](https://github.com/mohammaDJ23/expense-api/commit/d77e7e163e8ff12780a60f7d772bc51c718a4bb7))
- 553939 add the mailer service of bills export ([d5162a3](https://github.com/mohammaDJ23/expense-api/commit/d5162a30c3964a7118974d670f72f292eb49919e))
- 553939 add the service related to load all bills based on the user id ([6411df8](https://github.com/mohammaDJ23/expense-api/commit/6411df8b6fe67be151482c9228c758823a6b2405))
- 553939 export the related service of bill and create the module of export ([8c2557f](https://github.com/mohammaDJ23/expense-api/commit/8c2557f1e547c29a380fca17d1060692812ea709))
- 553939 get the users and generate excel for each of them the make a report as an email ([84a17d4](https://github.com/mohammaDJ23/expense-api/commit/84a17d43e7b35f1c206dd472737bff6ce9d33d08))
- 553939 move out current user to the related folder ([0698f4b](https://github.com/mohammaDJ23/expense-api/commit/0698f4b08fa928a947ab0ecfebb71ccde0443acc))
- 553939 move out exception normalizer to features ([f437381](https://github.com/mohammaDJ23/expense-api/commit/f4373816e31edbf7d20304fd65fadf784d88552a))
- 553939 move the export to the bill module ([11b4598](https://github.com/mohammaDJ23/expense-api/commit/11b4598f4dc8dd67da07ac2949bec3aac5b849fe))
- 553939 move the transform response interceptor to responses feature ([0ac86ad](https://github.com/mohammaDJ23/expense-api/commit/0ac86ada62aeeda7a5d1ac29472593be8005e2a1))
- 553939 rename billsExport service ([dc314ab](https://github.com/mohammaDJ23/expense-api/commit/dc314abe0cd36a88390689815843ffa932b874a6))
- 553939 send the excel file of bills report to client ([e2b401f](https://github.com/mohammaDJ23/expense-api/commit/e2b401f771886154accce4030f484437698cb668))
- 553939 update constant file ([f005897](https://github.com/mohammaDJ23/expense-api/commit/f005897290ab9bbe8c70d7490fc50927c311d1d5))
- 553939 update the name of constants files ([77d07d2](https://github.com/mohammaDJ23/expense-api/commit/77d07d2fb8160d10200d178c4d52bc4c78b1a2c4))
- 553939 update the package ([b0fcf48](https://github.com/mohammaDJ23/expense-api/commit/b0fcf48981768dea0c1e09609b91a5a2f8c9efd3))
- 553939 update the time of cron job ([d6819b8](https://github.com/mohammaDJ23/expense-api/commit/d6819b810d89b4dac2882d9805448c7b26ffc42f))
- 553939 use p-limit ([6a3ebb8](https://github.com/mohammaDJ23/expense-api/commit/6a3ebb86ecc11d7304e54664424f743548218d42))

## [4.2.7](https://github.com/mohammaDJ23/expense-api/compare/v4.2.6...v4.2.7) (2026-08-03)

### ♻️ Code Refactoring

- 653435 move serializer folder into features ([8dceaaa](https://github.com/mohammaDJ23/expense-api/commit/8dceaaa76611d53b7cc66b0752c89537c9e2460e))
- 653435 split the parts of storing and sending email ([45e9cf5](https://github.com/mohammaDJ23/expense-api/commit/45e9cf5f0c7ba4ea09ebd9d85c7aa6bfcf8acc0e))
- 653435 update the global filters ([45cc61d](https://github.com/mohammaDJ23/expense-api/commit/45cc61d8dcfe4cc48ffdbb0a41d931d265969d1e))
- 653435 use pipe for current user ([0ddd871](https://github.com/mohammaDJ23/expense-api/commit/0ddd87138c0262318d4883875a543312c548b778))

### 🔧 Chores

- 653435 add the interfaces of export module ([419b3c7](https://github.com/mohammaDJ23/expense-api/commit/419b3c7bc0e57a3b6b88615f6e06c17764a15b34))

## [4.2.6](https://github.com/mohammaDJ23/expense-api/compare/v4.2.5...v4.2.6) (2026-08-02)

### 🐛 Bug Fixes

- 449530 update the end date ([1d75531](https://github.com/mohammaDJ23/expense-api/commit/1d75531f004d7e0b1ad99d998875d26def4a6656))

### ♻️ Code Refactoring

- 449530 move the features of core into features folder ([128d9ff](https://github.com/mohammaDJ23/expense-api/commit/128d9ff5d98e9fe6011e262d91f2132a95f743fc))

### 🔧 Chores

- 449530 add the api of the bills period ([513d1b5](https://github.com/mohammaDJ23/expense-api/commit/513d1b53efebf3e718a10d5d3668ba253585c4fa))
- 449530 add the bills timeline api ([478d48d](https://github.com/mohammaDJ23/expense-api/commit/478d48dddf3c6bb460825f674045da6153520840))
- 449530 add the client timezone for better date formatting ([0c75b18](https://github.com/mohammaDJ23/expense-api/commit/0c75b18a8ed77170a6e3e5cad7190b82f8ce94b0))
- 449530 update a package ([a9def0c](https://github.com/mohammaDJ23/expense-api/commit/a9def0c6f67268bf07a44953a02386fad7805b1b))

## [4.2.5](https://github.com/mohammaDJ23/expense-api/compare/v4.2.4...v4.2.5) (2026-08-01)

### 🐛 Bug Fixes

- 780253 update the path of type ([f6c303d](https://github.com/mohammaDJ23/expense-api/commit/f6c303dd8a5c8a2f5cee6e7c7445ba05713aa878))

### ♻️ Code Refactoring

- 780253 move all the interfaces of authetication inside types folder ([04a06d5](https://github.com/mohammaDJ23/expense-api/commit/04a06d5d5afc58c8c9e0b54cf395b0b7b7bfdfb1))
- 780253 move classConstructor to the types ([a18e419](https://github.com/mohammaDJ23/expense-api/commit/a18e419870aaf394826641282e50b9bf9cd16a35))
- 780253 move constatnts to core ([b9a0105](https://github.com/mohammaDJ23/expense-api/commit/b9a0105cfccc5680c4b38762f097e258160fd392))
- 780253 move out all types to the related folder ([ddfa640](https://github.com/mohammaDJ23/expense-api/commit/ddfa640e1c54c9d98424bb42c79ad377fe80c3e5))
- 780253 move out the outbox types to the related folder ([4448e61](https://github.com/mohammaDJ23/expense-api/commit/4448e616de9280d803890c5619bf543265b197cd))
- 780253 move out the related types of search ([a193919](https://github.com/mohammaDJ23/expense-api/commit/a193919f7d6024949c348af97b7598fabba30b54))
- 780253 move out the type to the related folder ([b1ac727](https://github.com/mohammaDJ23/expense-api/commit/b1ac7278ec7c33283a2becbc7ab735cf6081d248))
- 780253 move out the type to the related folder ([f5347c1](https://github.com/mohammaDJ23/expense-api/commit/f5347c1b1f1aa8bfbeab5f040c2c208259020355))
- 780253 move utils to core ([76a27b7](https://github.com/mohammaDJ23/expense-api/commit/76a27b7b2d5a8cb4a3a9eb77e3d166e7015a99c2))
- 780253 rename currentuser tpye ([0aa2ad6](https://github.com/mohammaDJ23/expense-api/commit/0aa2ad6f6a7625b1a68587f2703a8c4e720f86c2))
- 780253 rename interfaces to types ([0d6accb](https://github.com/mohammaDJ23/expense-api/commit/0d6accb3e55996e985066457bde7612ce12cb696))
- 780253 rename the httpResponse type ([25362fb](https://github.com/mohammaDJ23/expense-api/commit/25362fbd6e56112a06c41ceb0aa12e07fa22a65a))
- 780253 rename the types ([55d63af](https://github.com/mohammaDJ23/expense-api/commit/55d63af868dfcfbd6915ea7ecc0407e8928cd19d))
- 780253 splite the relation interfaces into the related folder ([53434ab](https://github.com/mohammaDJ23/expense-api/commit/53434ab84034092cc8a8f3f7d118f8c9841e8a83))
- 780253 splite the types and interfaces ([eed34a9](https://github.com/mohammaDJ23/expense-api/commit/eed34a9477a60fb8d392d12612c258fa56e77723))

## [4.2.4](https://github.com/mohammaDJ23/expense-api/compare/v4.2.3...v4.2.4) (2026-07-31)

### 🔧 Chores

- 009932 do not use nullable for purchasedAt ([a3c8fed](https://github.com/mohammaDJ23/expense-api/commit/a3c8fed796a937d7bbdacc30a23d24f4f1711771))
- 009932 use the default values inside dtos ([f61a294](https://github.com/mohammaDJ23/expense-api/commit/f61a2942a6ad64886ef39e12cc8780cd88f37b58))

## [4.2.3](https://github.com/mohammaDJ23/expense-api/compare/v4.2.2...v4.2.3) (2026-07-31)

### 🔧 Chores

- 505929 add FindMostUsedConsumers query ([f53165b](https://github.com/mohammaDJ23/expense-api/commit/f53165b87208eb93721dcba71122fc3cc53673de))
- 505929 add FindMostUsedLocations query ([11d0062](https://github.com/mohammaDJ23/expense-api/commit/11d00623dfdeacf6bcba5d5b76e2748fc72bb5a5))
- 505929 add FindMostUsedReceivers query ([ceb9908](https://github.com/mohammaDJ23/expense-api/commit/ceb9908980acd511422876a37a3664b0b7b15886))
- 505929 add the most used apis of a bill ([6cc1973](https://github.com/mohammaDJ23/expense-api/commit/6cc1973220e2ce21f8c6c7ba80e97b28e2c53dc6))
- 505929 add the repos of the most used statistics ([324bfe9](https://github.com/mohammaDJ23/expense-api/commit/324bfe97fd14ee2d04a069f3f0ce149553edaec1))
- 505929 add the services related to the most used statistics of a bill ([c71fd67](https://github.com/mohammaDJ23/expense-api/commit/c71fd67f8db7b68bcde3d4214e6ae123f74f8aa9))
- 505929 pass just related ids to load the relations ([f27e7c7](https://github.com/mohammaDJ23/expense-api/commit/f27e7c7e465484e34bd28cab75b2234daee5f691))

## [4.2.2](https://github.com/mohammaDJ23/expense-api/compare/v4.2.1...v4.2.2) (2026-07-30)

### 🔧 Chores

- 013723 update the status ([3821e95](https://github.com/mohammaDJ23/expense-api/commit/3821e95839a18c3277bef286662c9e386c401e0d))
- 440883 add the find total of bills api ([9ba91f8](https://github.com/mohammaDJ23/expense-api/commit/9ba91f83a5311f70e36200f30cfbd207f5d31625))
- 440883 add the find total of consumers api ([2a22fbd](https://github.com/mohammaDJ23/expense-api/commit/2a22fbd8ad3a6dda09a4ae584500eb7eeccb0e63))
- 440883 add the find total of locations api ([020e2db](https://github.com/mohammaDJ23/expense-api/commit/020e2db9785d66a8f615c0c175c95b190fef1608))
- 440883 add the find total of receivers api ([eb45674](https://github.com/mohammaDJ23/expense-api/commit/eb45674fdee33ccddf30a192a65534392088cb3a))
- 440883 add the find total of users api ([8d1003e](https://github.com/mohammaDJ23/expense-api/commit/8d1003e7bd3e1b4c6b1d9b89954f701e3aef0e93))
- 440883 add the total api to the bill list ([bfd10d1](https://github.com/mohammaDJ23/expense-api/commit/bfd10d18fa800a039c4e403bb22cfdb10d9e915c))
- 440883 add the total api to the consumer list ([2fbabb0](https://github.com/mohammaDJ23/expense-api/commit/2fbabb08a2c44f679398b386dd520f2c1a0f8f94))
- 440883 add the total api to the location list ([9a23f41](https://github.com/mohammaDJ23/expense-api/commit/9a23f41a22866e5f9740ae045624bd8320747730))
- 440883 add the total api to the receiver list ([ae666dc](https://github.com/mohammaDJ23/expense-api/commit/ae666dce8881eb20b2a72bbe471e4cf56486512b))
- 440883 add the total api to the user list ([f89a679](https://github.com/mohammaDJ23/expense-api/commit/f89a6796942e9e31b4a24d100459496802229411))
- 440883 remove the unused package ([d29b234](https://github.com/mohammaDJ23/expense-api/commit/d29b2347352534228ce9b17b80287588e839a188))
- 440883 rename add the related interfaces ([61ebb7e](https://github.com/mohammaDJ23/expense-api/commit/61ebb7edc409ad0e704699673cbd298147706456))
- 440883 rename IList to IListQuery ([a6b58bc](https://github.com/mohammaDJ23/expense-api/commit/a6b58bcaffa248fe2183e92b638e9354455b7181))
- 440883 update some packages ([15240cd](https://github.com/mohammaDJ23/expense-api/commit/15240cddcbfe9177a033be55578bd3e7d93dacc0))
- 440883 update some packages ([b8d612e](https://github.com/mohammaDJ23/expense-api/commit/b8d612eab353847f0f5b16a8d0bd4c282f76b348))
- 440883 update some packages ([996b849](https://github.com/mohammaDJ23/expense-api/commit/996b8492e2b0f475fba2d0619713c22b8cf40879))
- 440883 update some packages ([34edfd5](https://github.com/mohammaDJ23/expense-api/commit/34edfd5b3de74bcd071acaa8c645e0451b8bafcb))
- 440883 update the logic of healthcheck ([944f41e](https://github.com/mohammaDJ23/expense-api/commit/944f41e3bace881564d78683dbc49490ff0dbac4))
- 440883 update the package ([51a255f](https://github.com/mohammaDJ23/expense-api/commit/51a255f5aeff3b0d05e506e3c442d8fe51751456))
- 440883 update the package ([a2dbd0b](https://github.com/mohammaDJ23/expense-api/commit/a2dbd0b325e5129b7ea246458a6356c6ef150321))
- 440883 update the package ([1541369](https://github.com/mohammaDJ23/expense-api/commit/1541369f2ab0c3cf423a03c1e666982b6afb75c1))
- 440883 update the packages ([4beb63e](https://github.com/mohammaDJ23/expense-api/commit/4beb63e720a0393451e280ddc5802d56c382f88a))

## [4.2.1](https://github.com/mohammaDJ23/expense-api/compare/v4.2.0...v4.2.1) (2026-07-19)

### ♻️ Code Refactoring

- 638860 add the user existence validators ([17c35ba](https://github.com/mohammaDJ23/expense-api/commit/17c35baaa286f28807da7b094ff0e5fb11b5c1ed))
- 638860 add UserUniqueEmailValidatorService ([1ee90d1](https://github.com/mohammaDJ23/expense-api/commit/1ee90d1639e0687a58428f54eac52065cd4cfbd9))
- 638860 change the message text ([700203b](https://github.com/mohammaDJ23/expense-api/commit/700203b27c8ddfce11635c00af46a4e61a656fb0))
- 638860 ignore index error ([2ed7c72](https://github.com/mohammaDJ23/expense-api/commit/2ed7c729d00dede6fea2b3321a1c9a6195d2657f))
- 638860 redesign the bill loader based on the relation loader interfacess ([4c7510d](https://github.com/mohammaDJ23/expense-api/commit/4c7510d856112192ca5ae301b7d6873ee7dd1e23))
- 638860 remove IdEntity ([085ba2a](https://github.com/mohammaDJ23/expense-api/commit/085ba2ab989cfb962c9ad6126dbabf47e01c36aa))
- 638860 remove override ([7469d9c](https://github.com/mohammaDJ23/expense-api/commit/7469d9cb9a0b971868635f0045083f6ebb037046))
- 638860 remove redundant blocks ([94a2c1f](https://github.com/mohammaDJ23/expense-api/commit/94a2c1fa19563b12fa62b2115270857b4f7313a7))
- 638860 remove unnecessary blocks ([0b360ce](https://github.com/mohammaDJ23/expense-api/commit/0b360ce9dda05378fd71f27ff6e6c00259e77447))
- 638860 remove unnecessary service ([f54e53e](https://github.com/mohammaDJ23/expense-api/commit/f54e53e1e8774c6bfe74518ed42eef9291b79204))
- 638860 remove unused comments ([13957d7](https://github.com/mohammaDJ23/expense-api/commit/13957d7ca3f22ee53599a8b0bb735a2cc831d97e))
- 638860 remove unused files ([e42d536](https://github.com/mohammaDJ23/expense-api/commit/e42d5367259be67cbdb2baeaf155815496d9555d))
- 638860 remove unused files ([3d8918b](https://github.com/mohammaDJ23/expense-api/commit/3d8918bd331da1d1b8e283b6c0b868e52010605c))
- 638860 remove unused files ([d7de802](https://github.com/mohammaDJ23/expense-api/commit/d7de80213e528e6b2fe163ac634f46e6ff5f3254))
- 638860 remove unused files ([96be8e4](https://github.com/mohammaDJ23/expense-api/commit/96be8e435891c5981b41aa3cd194ec9c058a045d))
- 638860 reorganize the search services ([1dace2a](https://github.com/mohammaDJ23/expense-api/commit/1dace2a2de18a0f18a211248c26ff73e825c0770))
- 638860 revert pnpm key ([c54594e](https://github.com/mohammaDJ23/expense-api/commit/c54594ed598850990b36436921b2d3a38eafe2c8))
- 638860 revert the comments ([fd8a732](https://github.com/mohammaDJ23/expense-api/commit/fd8a7324b0f78bcffadc8ba2568603b4fdd7592b))
- 638860 update ExistsUserByEmailHandler ([3529a32](https://github.com/mohammaDJ23/expense-api/commit/3529a321f6fe0cebcff5434374f34ed64052ce3a))
- 638860 update toExistsByCount ([538a59c](https://github.com/mohammaDJ23/expense-api/commit/538a59c529265d9c2f2d01391e374769621aa0f9))
- 638860 use a better exception ([df41f4c](https://github.com/mohammaDJ23/expense-api/commit/df41f4c6bf3f2c25bd6cbddda45fcd25d927261c))
- 638860 use Iservice ([46b6695](https://github.com/mohammaDJ23/expense-api/commit/46b6695f3b968973a417617aa4c0e37301dc9bf1))
- 638860 use Iservice ([fbfde1f](https://github.com/mohammaDJ23/expense-api/commit/fbfde1f1630176e0825716895718c0c68c59b579))
- 638860 use Iservice ([7103fbc](https://github.com/mohammaDJ23/expense-api/commit/7103fbc785956ec517ec5e730acf1cfb1a60ae81))
- 638860 use Iservice ([9a502b9](https://github.com/mohammaDJ23/expense-api/commit/9a502b96b7b30362493b7a50e1cd888b3f2903e3))
- 638860 use Iservice ([7888d4f](https://github.com/mohammaDJ23/expense-api/commit/7888d4f88a2b490b35dfb2301f26519636fbf44a))
- 638860 use Iservice ([dd19e71](https://github.com/mohammaDJ23/expense-api/commit/dd19e719680de5aa5337933c5b387bb18ab99571))
- 638860 use the outbox event service ([aeb667c](https://github.com/mohammaDJ23/expense-api/commit/aeb667c212a08f2c6f18cbcc8ea7acfb068f4f9d))
- 638860 use try catch to catch the not verified jwt ([4b66460](https://github.com/mohammaDJ23/expense-api/commit/4b6646068c2e91ccbb83c820a50ea8cb705a7917))

### 🔧 Chores

- 638860 add and use the relation synchronization ([3bfa1fc](https://github.com/mohammaDJ23/expense-api/commit/3bfa1fc094c349e1917d8d62b3ae3b5ac29ccbfb))
- 638860 add billsConsumers as relation loader ([13dd435](https://github.com/mohammaDJ23/expense-api/commit/13dd43573aaf715140ee7a34b57a1c4fb6d975fd))
- 638860 add ConsumerNameAvailableValidatorService ([5b34d0c](https://github.com/mohammaDJ23/expense-api/commit/5b34d0ce642f8e495e9208df3a4b236bc8ae23f7))
- 638860 add ExistsConsumerByUserIdAndNameQuery ([9976776](https://github.com/mohammaDJ23/expense-api/commit/9976776bd82a06072578a1f55bdb5cd6e78aa32b))
- 638860 add ExistsLocationByUserIdAndName ([757c157](https://github.com/mohammaDJ23/expense-api/commit/757c157680e6ac120a05350d5dc005cb897c2d60))
- 638860 add ExistsReceiverByUserIdAndName ([690bc27](https://github.com/mohammaDJ23/expense-api/commit/690bc27f30df33d55cb9a4daa040348dbd16382f))
- 638860 add groupBy ([c75fb35](https://github.com/mohammaDJ23/expense-api/commit/c75fb3554cf0607405029518cfc8ee2e870039bd))
- 638860 add LocationNameAvailableValidatorService ([2a21ec7](https://github.com/mohammaDJ23/expense-api/commit/2a21ec7661e99cabec36e06cb66d25a58c07ec5a))
- 638860 add outbox module ([5116d53](https://github.com/mohammaDJ23/expense-api/commit/5116d53bcfc4a8475154c0ca31b080f26be86048))
- 638860 add outbox module ([530ea1e](https://github.com/mohammaDJ23/expense-api/commit/530ea1eab9abfe71786ded993d68e83e0d0d1c72))
- 638860 add OutboxEventPublisherService ([e504937](https://github.com/mohammaDJ23/expense-api/commit/e504937195f1bbe72a137186b718e8684642b9ac))
- 638860 add ReceiverNameAvailableValidatorService ([372a77c](https://github.com/mohammaDJ23/expense-api/commit/372a77c18d15bc5615b1a591998af92b8b967139))
- 638860 add relation loader interfaces ([8d8f48f](https://github.com/mohammaDJ23/expense-api/commit/8d8f48f6c60b03707fd45e4e47e93e7cdc9b7251))
- 638860 comment trap command temporarly ([b6cc8f3](https://github.com/mohammaDJ23/expense-api/commit/b6cc8f3488bb64dae4f224d845434e5c68488b3c))
- 638860 export the services ([fa9cb82](https://github.com/mohammaDJ23/expense-api/commit/fa9cb82d88ccc2b333fa15a12198f90e18f005d7))
- 638860 ignore .DS_Store ([d30bd53](https://github.com/mohammaDJ23/expense-api/commit/d30bd53020c7993bd672065a7df15fd86dde9ea1))
- 638860 ignore tsbuildinfo ([7142778](https://github.com/mohammaDJ23/expense-api/commit/71427781fe72e90b2f980a51fa5796951631d79d))
- 638860 move all related search services to the search folder ([f39febb](https://github.com/mohammaDJ23/expense-api/commit/f39febb4188aafa379a47fd7d2d3d5dc9b9ad575))
- 638860 move all related search services to the search folder ([1d6999b](https://github.com/mohammaDJ23/expense-api/commit/1d6999b1c8d938eb88251b6f4c6a494cb007c8c2))
- 638860 move all related search services to the search folder ([d712788](https://github.com/mohammaDJ23/expense-api/commit/d71278849ebf3a6ebf5fda5ef267e10d7475bd93))
- 638860 move the updated user command to the login service ([4acffc8](https://github.com/mohammaDJ23/expense-api/commit/4acffc8b53b23f672f2a9c57400079276ec83723))
- 638860 remove the unused outbox events ([a2d0580](https://github.com/mohammaDJ23/expense-api/commit/a2d058081e5f7b6bdb7bbcadda79e1c054c2f150))
- 638860 remove unused queryBus ([a1c8877](https://github.com/mohammaDJ23/expense-api/commit/a1c8877b24e0d5f6538e1f993e63df6a01c39296))
- 638860 rename the relation services ([f96eb9f](https://github.com/mohammaDJ23/expense-api/commit/f96eb9f12bf7b59678af059bd20673e968d1a7bc))
- 638860 reuse Iservice for kafka ([883ce75](https://github.com/mohammaDJ23/expense-api/commit/883ce758df8ee918f972a64ab39f19ac98e7cdee))
- 638860 split the service validators ([0994a97](https://github.com/mohammaDJ23/expense-api/commit/0994a9792d4b385bd1366a3c92a387f2c94da441))
- 638860 throw error when user not exsists ([33edb4b](https://github.com/mohammaDJ23/expense-api/commit/33edb4b4de9e669c2fd52e76a0852975efd561c2))
- 638860 update Iservice ([21e17a7](https://github.com/mohammaDJ23/expense-api/commit/21e17a78c8551d092de1775d87ebd408058d8b28))
- 638860 update the messages ([342ecde](https://github.com/mohammaDJ23/expense-api/commit/342ecde6be455dd3b432209caca9184ee6ef80ee))
- 638860 update the relation interfaces ([6861217](https://github.com/mohammaDJ23/expense-api/commit/6861217558452c28f188227af6bfdcf8d98470aa))
- 638860 update the relation serivces based on the interface ([0ea193c](https://github.com/mohammaDJ23/expense-api/commit/0ea193c6a274d74abd63e5e3fef119d3bd8bf718))
- 638860 update the types of payload ([567dea3](https://github.com/mohammaDJ23/expense-api/commit/567dea3828091b3738feffc02b4360b2e884744f))
- 638860 use assembler services properly ([eb5957e](https://github.com/mohammaDJ23/expense-api/commit/eb5957e86ffeb9d354ce11c436af4ccce1c9712c))
- 638860 use Iservice ([d2ed2c5](https://github.com/mohammaDJ23/expense-api/commit/d2ed2c5bf3be70f4aad199990dfa9cbaaf9d9638))
- 638860 use Iservice ([3df275a](https://github.com/mohammaDJ23/expense-api/commit/3df275aa6f67f78ce1a547519762761ef762766d))
- 638860 use IVaildatorService ([a20c75a](https://github.com/mohammaDJ23/expense-api/commit/a20c75aad494fa103b9f139f22300b5cbd4c7b58))
- 638860 use the condition of verified user correctly ([c942047](https://github.com/mohammaDJ23/expense-api/commit/c94204791ab3f55e3137cb15b5f68007d7aed6e3))
- 638860 use the validator services ([35c9d6b](https://github.com/mohammaDJ23/expense-api/commit/35c9d6bf71b63539d6a42d71c3ec33d9e650aec6))
- 638860 use validators and outbox event service ([4e1bb7a](https://github.com/mohammaDJ23/expense-api/commit/4e1bb7a8681ab81b25699c7d87769612c2122d2c))
- 638860 use validators and outbox event service ([01998ab](https://github.com/mohammaDJ23/expense-api/commit/01998ab2c3801405b25e5269717da64b85d49555))
- 638860 use validators and outbox event service ([a0f7c8d](https://github.com/mohammaDJ23/expense-api/commit/a0f7c8d54c0ec46d5a3bf1de6634ce819fac7179))

## [4.2.0](https://github.com/mohammaDJ23/expense-api/compare/v4.1.1...v4.2.0) (2026-07-13)

### ✨ Features

- 389615 add the search api ([c6b944f](https://github.com/mohammaDJ23/expense-api/commit/c6b944f93fd74df816284cf3f37b1e82ddcb3297))

### 🐛 Bug Fixes

- 389615 fix the eslint issues ([7bb89f4](https://github.com/mohammaDJ23/expense-api/commit/7bb89f42193d01a2afa902616a2a2d756a31fb1a))
- 389615 remove the array and use searches inside promise all diractly ([3f0dc11](https://github.com/mohammaDJ23/expense-api/commit/3f0dc115b77147d78317a9cfde9882af1feb4bb6))

### 🔧 Chores

- 389615 add gitattributes ([15ce3ce](https://github.com/mohammaDJ23/expense-api/commit/15ce3ce90ee52a68fb89ddfbc97af0fe955babec))
- 389615 add SearchOrchestratorService & SearchAggregateOrchestratorService ([162f2fe](https://github.com/mohammaDJ23/expense-api/commit/162f2fecfacf334c301c37b2c4a8c296965878ca))
- 389615 add the bill aggregation service and find bills by user id and ids ([5ea0a7c](https://github.com/mohammaDJ23/expense-api/commit/5ea0a7c931e0066bb4b56f67a7e71ed59bb0a05d))
- 389615 add the bill search aggregate service ([32fb033](https://github.com/mohammaDJ23/expense-api/commit/32fb033f5f75fc392b39aa7a8f610ebc95ee0d22))
- 389615 add the bill search index register service ([a392331](https://github.com/mohammaDJ23/expense-api/commit/a39233156a65eb7731bb404b6a3b6b4e89778bb5))
- 389615 add the bill search service ([b69e2a1](https://github.com/mohammaDJ23/expense-api/commit/b69e2a1ce11296ecf943863b984c0f701625df49))
- 389615 add the consumer search aggregate service ([59cac06](https://github.com/mohammaDJ23/expense-api/commit/59cac068f2da9225a1fac3e0b4529a587f428fb8))
- 389615 add the consumer search index register service ([f7188ee](https://github.com/mohammaDJ23/expense-api/commit/f7188ee5fe23bc7fd33f98f3dab0d4cb74a8ae83))
- 389615 add the consumer search service ([9ad889d](https://github.com/mohammaDJ23/expense-api/commit/9ad889d8eabf11ccb4d9e592c0bb25e4db300266))
- 389615 add the elasticsearch index and query ([738121c](https://github.com/mohammaDJ23/expense-api/commit/738121cf27756fa1b5ecbbb274d420e1348643f6))
- 389615 add the elasticsearch index and query ([3ca0a43](https://github.com/mohammaDJ23/expense-api/commit/3ca0a435277a0fc74f5ae44d57483528b136dfaa))
- 389615 add the elasticsearch index and query ([3d98801](https://github.com/mohammaDJ23/expense-api/commit/3d9880102116dcd7185d2b6e6f3eeedd42dfc431))
- 389615 add the elasticsearch index and query ([9b3223c](https://github.com/mohammaDJ23/expense-api/commit/9b3223c2709555be7b312618d655c0068a18fab9))
- 389615 add the elasticsearch index and query interfaces ([4bcb11f](https://github.com/mohammaDJ23/expense-api/commit/4bcb11f94de542cc48622ba947058de46e442b3b))
- 389615 add the elasticsearch index registration index service ([bb33eab](https://github.com/mohammaDJ23/expense-api/commit/bb33eab32f163572836f1743e717f880ba21210b))
- 389615 add the location search aggregate service ([8a71b36](https://github.com/mohammaDJ23/expense-api/commit/8a71b3661a47266dfef15376c56f65d25c1b48b1))
- 389615 add the location search index register service ([0eee036](https://github.com/mohammaDJ23/expense-api/commit/0eee036c3b2130ed9773824d382337b7ef51b2b7))
- 389615 add the location search service ([f1666fe](https://github.com/mohammaDJ23/expense-api/commit/f1666fea44d0abbeecb991349bfe3591025fafd2))
- 389615 add the receiver search aggregate service ([1595374](https://github.com/mohammaDJ23/expense-api/commit/1595374ce4838873682ad03454e7928f623de4a4))
- 389615 add the receiver search index register service ([1b17cd9](https://github.com/mohammaDJ23/expense-api/commit/1b17cd9295e95c75edf518b02398424327f258ef))
- 389615 add the receiver search service ([c6a6ffd](https://github.com/mohammaDJ23/expense-api/commit/c6a6ffd15d56d9b7c45a7c1f9103cc6be63a35fb))
- 389615 add user id to query ([640df15](https://github.com/mohammaDJ23/expense-api/commit/640df154e872517a91bcb12b33425f49384c995c))
- 389615 add whenNotEmpty ([77e1aa0](https://github.com/mohammaDJ23/expense-api/commit/77e1aa06ec212053c2209071f0b57ad20855b53c))
- 389615 get the actual data from db ([97cfa1d](https://github.com/mohammaDJ23/expense-api/commit/97cfa1d28459ea06ef8cdb437b07c9e45c2d8755))
- 389615 increase start_period ([fc80b87](https://github.com/mohammaDJ23/expense-api/commit/fc80b872f62ef0554d9c202297676545f7446a09))
- 389615 increase start_period ([feb4c59](https://github.com/mohammaDJ23/expense-api/commit/feb4c594648e2faed7e416c251db4f0e3c912c90))
- 389615 remove the search index register ([fa58431](https://github.com/mohammaDJ23/expense-api/commit/fa58431ea2b360793f7dea8dac97a03dcd917575))
- 389615 revise the elasticsearch difinition ([d3f8a7e](https://github.com/mohammaDJ23/expense-api/commit/d3f8a7ea614abddaa5f20a65d60069c3c142c339))
- 389615 update the query and mapping of bill ([a2418ab](https://github.com/mohammaDJ23/expense-api/commit/a2418ab1c8f519ab7cc9c8454aff989d606df918))
- 389615 use MIN_LIST_LIMIT & MAX_LIST_LIMIT ([57a265e](https://github.com/mohammaDJ23/expense-api/commit/57a265ea2a69cad463ba3ed8ccd8b1ba33274b02))
- 389615 use promise all to search ([662fe0f](https://github.com/mohammaDJ23/expense-api/commit/662fe0fa5491cbe78e59877ea18493e1e52093c0))
- 389615 use services correctly ([0e77c67](https://github.com/mohammaDJ23/expense-api/commit/0e77c673cc3242236182f72b74da54e48c5c060a))
- 398615 use the definition methods ([82ec332](https://github.com/mohammaDJ23/expense-api/commit/82ec332c9e966813b68463e0564bb6cd3e69e92e))

## [4.1.1](https://github.com/mohammaDJ23/expense-api/compare/v4.1.0...v4.1.1) (2026-07-10)

### 🐛 Bug Fixes

- 157169 fix the error for now becuase of the drizzle schema ([88392cd](https://github.com/mohammaDJ23/expense-api/commit/88392cd66fb8c671a3737621ae5bd9876ae6af4a))
- 157169 remove snapshot.mode ([0ca0167](https://github.com/mohammaDJ23/expense-api/commit/0ca0167cfb27342fc730fbbccbc2cf5b767960c7))
- 157169 remove the chmod ([f7b90a9](https://github.com/mohammaDJ23/expense-api/commit/f7b90a95de8177a418ea32c4c6e695e880173df9))
- 157169 upgrade the packages ([e2a8096](https://github.com/mohammaDJ23/expense-api/commit/e2a809658c250f7c912eb7b78e33343039bab906))
- 157169 upgrade the packages ([833e31f](https://github.com/mohammaDJ23/expense-api/commit/833e31f1ab24b6238f3c4595ff809ccfe435b275))

### 🔧 Chores

- 157169 add @xhmikosr/decompress as ovverrides ([2ce71ee](https://github.com/mohammaDJ23/expense-api/commit/2ce71eed55e21c2c53f94d2b7d4dfdcd86f3e0bf))
- 157169 add @xhmikosr/decompress as ovverrides ([d0ee076](https://github.com/mohammaDJ23/expense-api/commit/d0ee0761b1671c925e5ad871da43ee65e59b4716))
- 157169 add chmod to elasticsearch password ([64c0a8d](https://github.com/mohammaDJ23/expense-api/commit/64c0a8d4317e32e2fad62c1e5d8b0d8728de5984))
- 157169 add deleteReceiver message ([aebae4f](https://github.com/mohammaDJ23/expense-api/commit/aebae4f800500cce0fd256cc3fdb3adb47bd85d0))
- 157169 add depoend_on of elastic to expense-api service ([b4a6b6f](https://github.com/mohammaDJ23/expense-api/commit/b4a6b6fb541b724c58189e6e4a9f29b16136e333))
- 157169 add elasticsearch service ([27d9c39](https://github.com/mohammaDJ23/expense-api/commit/27d9c39489c75251be8b7ef02b779c753eeaf977))
- 157169 add mirror-elasticsearch job ([7f04165](https://github.com/mohammaDJ23/expense-api/commit/7f04165783d46b8aa6a92405e7c0e13581e15c19))
- 157169 add route as a defualt column ([a047407](https://github.com/mohammaDJ23/expense-api/commit/a047407d33bdd7de70f4cf125a877cc78939e141))
- 157169 add route for kafka top ([b10ecce](https://github.com/mohammaDJ23/expense-api/commit/b10ecce86ffe766997742195b42790e75c6a6087))
- 157169 add the arg type of IMessageHandler ([714fd99](https://github.com/mohammaDJ23/expense-api/commit/714fd99b5d44d0221e62f0d521034bcd57faba50))
- 157169 add the bill messages ([18598b7](https://github.com/mohammaDJ23/expense-api/commit/18598b734c7112e1a9a855ac5c0bc8bf7195d77d))
- 157169 add the consumer messages ([b1d7ba0](https://github.com/mohammaDJ23/expense-api/commit/b1d7ba0f69972412e484032f38ba20ee66de76c9))
- 157169 add the create location message ([b654be2](https://github.com/mohammaDJ23/expense-api/commit/b654be26bb37a965be7e2438c1e824f7b83611e7))
- 157169 add the custom bulk to hanlde errors ([71fd765](https://github.com/mohammaDJ23/expense-api/commit/71fd76509c40928e555ce78136bf8b64a8152527))
- 157169 add the delete location message ([7626e61](https://github.com/mohammaDJ23/expense-api/commit/7626e61a9136eb81b05dee36b5255880969d2217))
- 157169 add the elasticsearch docker entrypoint ([8cdf376](https://github.com/mohammaDJ23/expense-api/commit/8cdf376d041db13ea3c8b9d0e8294020cfd3f43b))
- 157169 add the elasticsearch env to docker compose ([ba279a1](https://github.com/mohammaDJ23/expense-api/commit/ba279a1c0e9cd6cdaf5df0304da4db2cbccd977a))
- 157169 add the elasticsearch module ([bcca3f2](https://github.com/mohammaDJ23/expense-api/commit/bcca3f2120243a37b15d01bb1acde9726d65b1a0))
- 157169 add the elasticsearch password as secret ([e703fb7](https://github.com/mohammaDJ23/expense-api/commit/e703fb765f5b0a4039ae14f1d65df4c2acdcbab5))
- 157169 add the elasticsearch service ([24da5c8](https://github.com/mohammaDJ23/expense-api/commit/24da5c8e497eee587ba47b94e4677ddd91f41263))
- 157169 add the evns of elasticsearch ([a8b730c](https://github.com/mohammaDJ23/expense-api/commit/a8b730cdedb877f81c797cc2e9f42eacecd31e09))
- 157169 add the kafka batch parser ([031e78d](https://github.com/mohammaDJ23/expense-api/commit/031e78d019a75809fd8f637a568ee34efa77778a))
- 157169 add the message header and payload ([0582f4e](https://github.com/mohammaDJ23/expense-api/commit/0582f4e38cfdcff11b261793f61669c7b76e78c7))
- 157169 add the message processor ([1d46c83](https://github.com/mohammaDJ23/expense-api/commit/1d46c8361b9b302e8f1dcf1018f5f883f34eed3a))
- 157169 add the properties to the header ([24ed03d](https://github.com/mohammaDJ23/expense-api/commit/24ed03dd6a5a3bfe9eea7c687ca2111c950a7a3d))
- 157169 add the template of create receiver message ([6bfc179](https://github.com/mohammaDJ23/expense-api/commit/6bfc1790e805e64114281302b57656d74d1cd033))
- 157169 add the update location message ([bc69c4a](https://github.com/mohammaDJ23/expense-api/commit/bc69c4aed6143cd6046a17cae5bb195e462db82d))
- 157169 add the url of elasticsearch ([0986eb5](https://github.com/mohammaDJ23/expense-api/commit/0986eb5fbd2b6347d00cc0b921c131d1dd9aba61))
- 157169 add updateReceiver message ([d3f2ec7](https://github.com/mohammaDJ23/expense-api/commit/d3f2ec76c2f18a7f58429d19f39ced7b3f1a484a))
- 157169 create the message of create receiver ([50e8228](https://github.com/mohammaDJ23/expense-api/commit/50e8228dc1c04ce40e19cd726cede76f745e4963))
- 157169 defining each fields ([5317603](https://github.com/mohammaDJ23/expense-api/commit/5317603b1b5dc6b530af12b6956b40ce5fad89e7))
- 157169 downgrade elastic to 8.17 ([1dc07bb](https://github.com/mohammaDJ23/expense-api/commit/1dc07bbca876b8ff3f20eeb614b71db0af552ec7))
- 157169 pass just batch to each message ([333d158](https://github.com/mohammaDJ23/expense-api/commit/333d158809f60a13602bfac178b1366bb6a5966c))
- 157169 remove the comment ([d0097d2](https://github.com/mohammaDJ23/expense-api/commit/d0097d2486e6c17c95fc94639309b47545d8b5ca))
- 157169 remove the extra type of outbox ([e3f7494](https://github.com/mohammaDJ23/expense-api/commit/e3f749469c924f6b1d005afce0e44a29f2e486ec))
- 157169 remove the mirror job ([9fce5fc](https://github.com/mohammaDJ23/expense-api/commit/9fce5fc39399380e9551317b40eb6a320975bf47))
- 157169 remove the mirror job ([b7d1c34](https://github.com/mohammaDJ23/expense-api/commit/b7d1c3435f3bbf369b121482a4dbeb2eaa69671c))
- 157169 restric the type ([de39817](https://github.com/mohammaDJ23/expense-api/commit/de39817fdcd5fd8ab5fd15786b8d9f01215d303c))
- 157169 update the name of elastic ([911c047](https://github.com/mohammaDJ23/expense-api/commit/911c047becebe619588101499601dd5625cf6da9))
- 157169 update the topics ([1782d24](https://github.com/mohammaDJ23/expense-api/commit/1782d2455b749a7e46497ecefb742fbe1cf3b560))
- 157169 update the type of aggregate type ([9033e5d](https://github.com/mohammaDJ23/expense-api/commit/9033e5d9180cff168fbb7d6459c853698a17944e))
- 157169 use custom bulk ([9a636d9](https://github.com/mohammaDJ23/expense-api/commit/9a636d9ee2678c4311eae7e1e76905405e59614c))
- 157169 use my own elasticsearch hub ([66d7567](https://github.com/mohammaDJ23/expense-api/commit/66d7567c4c6bcbe4700204e0a69be01c4df8b11a))
- 157169 use route inside CreateReceiverMessageHandler ([99117ff](https://github.com/mohammaDJ23/expense-api/commit/99117ff5ce2f24cc651c7c2bf9f5e2ed6616a09f))
- 157169 use route instead of aggregate type ([91b77bb](https://github.com/mohammaDJ23/expense-api/commit/91b77bb77b86cfd4d70e24c1b6f7f05ff3b760bb))
- 157169 use route instead of aggregate_type ([d6b54d0](https://github.com/mohammaDJ23/expense-api/commit/d6b54d0da51adb5e6b1f81e71c1ece3d5cc960c1))
- 157169 use TOutboxEventType ([93ec728](https://github.com/mohammaDJ23/expense-api/commit/93ec7282b5f73fe39cb46a94b8948d8ea9eb4436))
- 157169 wrap the parser logic into trycatch ([fe567ab](https://github.com/mohammaDJ23/expense-api/commit/fe567abdb58f7f2de88e3163577c7056092eea1e))

## [4.1.0](https://github.com/mohammaDJ23/expense-api/compare/v4.0.2...v4.1.0) (2026-07-06)

### ✨ Features

- 243601 add the existsByUserIdAndExcludingIdAndName for consumer ([3e5682c](https://github.com/mohammaDJ23/expense-api/commit/3e5682c18ed34fdfe4a7169f715709b1e5e17dff))
- 243601 add the existsByUserIdAndExcludingIdAndName for location ([02b0f4b](https://github.com/mohammaDJ23/expense-api/commit/02b0f4b4155989979cc6b5b688c6844de001afeb))
- 243601 add the existsByUserIdAndExcludingIdAndName for receiver ([3b4d22d](https://github.com/mohammaDJ23/expense-api/commit/3b4d22d21ad2737913f92975b824e638dea30f8c))

### 🐛 Bug Fixes

- 287588 fix the indentation ([c7643ee](https://github.com/mohammaDJ23/expense-api/commit/c7643eeaed0a3eeac6fbb16a946318c93ab753ce))

### 🔧 Chores

- 243601 rename ExistsUserByIdQuery and repo ([a44db66](https://github.com/mohammaDJ23/expense-api/commit/a44db6642c366478343234721b86143c72a1a024))
- 243601 rename IExistsByUserIdAndIdRepository ([bc6bd7e](https://github.com/mohammaDJ23/expense-api/commit/bc6bd7e797c0b90cd139c22675abc66157fa5df3))
- 243601 rename IExistsByUserIdAndIdsRepository ([004c0a6](https://github.com/mohammaDJ23/expense-api/commit/004c0a68f8d08910c12a0115d30542e07ba19ab3))
- 287588 add an action to mirror the debezium image to my github repo ([2f4e466](https://github.com/mohammaDJ23/expense-api/commit/2f4e46631b200418f384bbb55e6ccabcc2496a99))
- 287588 add an action to mirror the debezium image to my github repo ([d0256a3](https://github.com/mohammaDJ23/expense-api/commit/d0256a3722a0258e14e4f8907a5cfc17a4aecd57))
- 287588 add discovery service into message and remove from kafka ([79b8f3b](https://github.com/mohammaDJ23/expense-api/commit/79b8f3b380499657639107ac68b9d14d6d9d0751))
- 287588 add exit code ([b48c4aa](https://github.com/mohammaDJ23/expense-api/commit/b48c4aaa200ff06ab92fd358020181ada4a28786))
- 287588 add fromBeginning ([922d1ab](https://github.com/mohammaDJ23/expense-api/commit/922d1ab1f2cba751d2e7b8eea5ba6ee756571517))
- 287588 add kafka and debezium-connect depends_on ([aa4a4ff](https://github.com/mohammaDJ23/expense-api/commit/aa4a4ff9eaeaad43b66011853713f50fea8c5a75))
- 287588 add some envs related to kafka ([138fba7](https://github.com/mohammaDJ23/expense-api/commit/138fba752689c7bc3047c2aa2f151452a3c4a008))
- 287588 add some evns to kafka service ([ba434b3](https://github.com/mohammaDJ23/expense-api/commit/ba434b35b9f817e415e635e32ebdba56df8689ff))
- 287588 add the configuration of the debezium and kafka services ([c8ff5ff](https://github.com/mohammaDJ23/expense-api/commit/c8ff5ffa4ad01f51361ec387b31adec867fee3e8))
- 287588 add the kafka configuration ([4e44716](https://github.com/mohammaDJ23/expense-api/commit/4e44716f7254f0a2ecad59bcdc0a3a9679081cd5))
- 287588 convert some services of kafka to message ([f895e90](https://github.com/mohammaDJ23/expense-api/commit/f895e905ef09410cd14a1c0f5b009fcf65cba25f))
- 287588 disable auto creation topics ([31988b7](https://github.com/mohammaDJ23/expense-api/commit/31988b7d7135eec2ac890da40cdba40bd1703476))
- 287588 do not expose the porst ([47b88e8](https://github.com/mohammaDJ23/expense-api/commit/47b88e80e65ebb028f67724e6ad807aeb244563f))
- 287588 override the postgres command ([876805c](https://github.com/mohammaDJ23/expense-api/commit/876805c0edcf362f14525c38ff66de2d3fb33d8e))
- 287588 remove search prefix ([6d4be47](https://github.com/mohammaDJ23/expense-api/commit/6d4be47d47f9dccb3708c7077f652d7d8951cb97))
- 287588 remove the debezium job ([fb0008d](https://github.com/mohammaDJ23/expense-api/commit/fb0008d3b4da103362f2ca37759e4ff6500cad65))
- 287588 remove the option of conusmer run ([876248c](https://github.com/mohammaDJ23/expense-api/commit/876248ca7f95853d3b5ae1cadfe751fa09f61ae4))
- 287588 remove the quotes ([d9e93f6](https://github.com/mohammaDJ23/expense-api/commit/d9e93f67598c6f761fbd1b2f1275037d9b42c0bd))
- 287588 spliting docker file of postgres for dev and prod ([e5455b5](https://github.com/mohammaDJ23/expense-api/commit/e5455b5cb38be6f514e9a6db5cf2e3772453a8ba))
- 287588 update debezuim healthcheck ([948ee6b](https://github.com/mohammaDJ23/expense-api/commit/948ee6b37afc20ba13470e5b9f9d982c4edfa25f))
- 287588 use bash ([13bd67a](https://github.com/mohammaDJ23/expense-api/commit/13bd67a9ef0032b6365b3a58cfecb3e40b8f932b))
- 287588 use image: mohammadnowresideh1997/debezium-connect:3.0.8.Final ([72f5bae](https://github.com/mohammaDJ23/expense-api/commit/72f5baeb7328e8ba72d2ef30552615c1c3c25071))
- 287588 wait for debezium service to be completed ([8b741ab](https://github.com/mohammaDJ23/expense-api/commit/8b741ab5d104b67f1a58f10bf4b0a384cfb16f95))
- 799869 add passthrough option ([7ca13c1](https://github.com/mohammaDJ23/expense-api/commit/7ca13c17a138334b9ba741c332aa56e3425e8ab2))
- 799869 change the verification and password token error ([bb1a85d](https://github.com/mohammaDJ23/expense-api/commit/bb1a85dc8d3caaaca65587de508db3e3a2204fe4))
- 799869 rename dbBackup.cron ([bda453d](https://github.com/mohammaDJ23/expense-api/commit/bda453d27876d817117488a63937ff56c76e9fd3))
- 799869 reuse the access token service ([7b1b9e5](https://github.com/mohammaDJ23/expense-api/commit/7b1b9e5a38043d96841634d1c3789c261b574aee))
- 799869 update the authentication flow with cookie ([5dab9c9](https://github.com/mohammaDJ23/expense-api/commit/5dab9c94882d0a3e53edf992e1470b62c24fe112))
- 799869 use cookie parser at the middle ware ([6138b3b](https://github.com/mohammaDJ23/expense-api/commit/6138b3bd5819829e9a4a6f092d42f00f601779ba))
- 799869 use cookieParser diractly inside main ([ade34fa](https://github.com/mohammaDJ23/expense-api/commit/ade34fafc3f02058f24f41574185ffd8869d2efc))

## [4.0.2](https://github.com/mohammaDJ23/expense-api/compare/v4.0.1...v4.0.2) (2026-07-02)

### 🐛 Bug Fixes

- 686199 fix the conflict ([795f15e](https://github.com/mohammaDJ23/expense-api/commit/795f15e43b62260e0189cc5b85fc404dbb470114))

### 🔧 Chores

- 339587 remove the abstract ([1432ed1](https://github.com/mohammaDJ23/expense-api/commit/1432ed10914202b28968b5cdb23990cde7f3bb05))
- 339587 remove the receiver abstract ([6de8d88](https://github.com/mohammaDJ23/expense-api/commit/6de8d88e4475fe18e0813f15a0d7d6a88ab54d09))
- 339587 update the create user command arg ([aa6f388](https://github.com/mohammaDJ23/expense-api/commit/aa6f388c0b45627c0de61731a2d99e363d8fb45e))
- 339587 update the CreateBillCommand arg ([f95001b](https://github.com/mohammaDJ23/expense-api/commit/f95001b435a832c347a4ce41af98c4cd656ecb9a))
- 339587 update the CreateConsumerCommand arg ([ceb0ed8](https://github.com/mohammaDJ23/expense-api/commit/ceb0ed82b8705c0849e14851191e64106b9401ca))
- 339587 update the CreateLocationCommand arg ([92ff89e](https://github.com/mohammaDJ23/expense-api/commit/92ff89e32dfa29e9c9b3cc29346e797b1709b51e))
- 339587 update the CreateManyBillsConsumersCommand arg ([5a2a00d](https://github.com/mohammaDJ23/expense-api/commit/5a2a00d0cafbbbaaa3bce4dff09bb4ee8671a14a))
- 339587 update the delete user command arg ([c67d513](https://github.com/mohammaDJ23/expense-api/commit/c67d51396013c0f0a0086ece1fa7c0457c9b2e2d))
- 339587 update the DeleteBillCommand arg ([854fb4b](https://github.com/mohammaDJ23/expense-api/commit/854fb4b7e51da26d2613c026e5a9a7c3e667a718))
- 339587 update the DeleteConsumerCommand arg ([6cfbeb3](https://github.com/mohammaDJ23/expense-api/commit/6cfbeb3b27bd8a00331ce24b30e58cc8217feb2b))
- 339587 update the DeleteLocationCommand arg ([a974b2d](https://github.com/mohammaDJ23/expense-api/commit/a974b2d3fedaf97d0935c9266a080fb1270b030c))
- 339587 update the DeleteManyBillsConsumersCommand arg ([7651c7f](https://github.com/mohammaDJ23/expense-api/commit/7651c7f7e0f81c7548c93cca7c38a186f012212c))
- 339587 update the DeleteReceiverCommand arg ([182b4cf](https://github.com/mohammaDJ23/expense-api/commit/182b4cf2edb5b710ffe96a043cf0913fc994b9b5))
- 339587 update the FindBillByUserIdAndIdOrThrowQuery arg ([21133c6](https://github.com/mohammaDJ23/expense-api/commit/21133c6f9518c8a857c2fdd2c9b53f1b19c56609))
- 339587 update the FindBillListByUserIdQuery arg ([1bf5a2f](https://github.com/mohammaDJ23/expense-api/commit/1bf5a2fbb40cc773771c37520becd6203175e7a8))
- 339587 update the FindConsumerByUserIdAndIdOrNullQuery arg ([eeb2583](https://github.com/mohammaDJ23/expense-api/commit/eeb25835610ced6e4434956ac238ada833d7d9d8))
- 339587 update the FindConsumerByUserIdAndIdOrThrowQuery arg ([ec2ad76](https://github.com/mohammaDJ23/expense-api/commit/ec2ad76cf56f146f35a0e965f606d9c74b5792c4))
- 339587 update the FindConsumerByUserIdAndNameOrNullQuery arg ([221a5b6](https://github.com/mohammaDJ23/expense-api/commit/221a5b6cfce19dddb14c850d63b4f74d259f9bd4))
- 339587 update the FindConsumerListByUserIdQuery arg ([cfc6374](https://github.com/mohammaDJ23/expense-api/commit/cfc6374457941cb86972b602bdeb87fb968065b5))
- 339587 update the FindLocationByUserIdAndIdOrNullQuery arg ([5d8d362](https://github.com/mohammaDJ23/expense-api/commit/5d8d3623996a33a18194dd320d7de56f96bba81e))
- 339587 update the FindLocationByUserIdAndIdOrThrowQuery arg ([980b6eb](https://github.com/mohammaDJ23/expense-api/commit/980b6ebf76bd4712e0a2ce8ff6a2f24f596283db))
- 339587 update the FindLocationByUserIdAndNameOrNullQuery arg ([f3276d6](https://github.com/mohammaDJ23/expense-api/commit/f3276d6ffd69050dab74481b59299a46f94dbed7))
- 339587 update the FindLocationListByUserIdQuery arg ([563898a](https://github.com/mohammaDJ23/expense-api/commit/563898a5d407ffd0960d313fcaeb753591f322ac))
- 339587 update the FindManyBillConsumerTargetsByRefIdsQuery arg ([63277c1](https://github.com/mohammaDJ23/expense-api/commit/63277c1dd057cd54729a9935ec03aa06446de918))
- 339587 update the FindManyBillsConsumersByRefIdQuery arg ([7511db2](https://github.com/mohammaDJ23/expense-api/commit/7511db27b51187801a63a8e69bfa36e4ca8dbc63))
- 339587 update the FindManyConsumersByUserIdAndIdsQuery arg ([966b121](https://github.com/mohammaDJ23/expense-api/commit/966b1217c2339453c5d9db3eab7eceff4aed3f43))
- 339587 update the FindManyLocationsByUserIdAndIdsQuery arg ([6ba34a2](https://github.com/mohammaDJ23/expense-api/commit/6ba34a20fed0b3c741315cf1eb97645208fe3c10))
- 339587 update the FindManyReceiversByUserIdAndIdsQuery arg ([d22e0be](https://github.com/mohammaDJ23/expense-api/commit/d22e0bed403ad8b742dbe75af8142c69bffc754a))
- 339587 update the FindReceiverByUserIdAndIdOrNullQuery arg ([50bcd06](https://github.com/mohammaDJ23/expense-api/commit/50bcd060b777071c3ead79681581164ac475af1b))
- 339587 update the FindReceiverByUserIdAndIdOrThrowQuery arg ([6023608](https://github.com/mohammaDJ23/expense-api/commit/60236080dd7513631290f74fe60bebeb5c5804f2))
- 339587 update the FindReceiverByUserIdAndNameOrNullQuery arg ([da93f36](https://github.com/mohammaDJ23/expense-api/commit/da93f369c9b8d6f2c8eb77344d916af5a78ed9f8))
- 339587 update the FindReceiverListByUserIdQuery arg ([f70cb47](https://github.com/mohammaDJ23/expense-api/commit/f70cb47c63c8501d63e5babf96bb3d5f1222d6d3))
- 339587 update the FindUserByEmailOrNullQuery arg ([8e636ef](https://github.com/mohammaDJ23/expense-api/commit/8e636efa3e8f9456676ee974d5509883750bafd5))
- 339587 update the FindUserByIdOrNullQuery arg ([a6773e5](https://github.com/mohammaDJ23/expense-api/commit/a6773e5cd285abf296169972e640686b83dd446b))
- 339587 update the FindUserByIdOrThrowQuery arg ([f3d3743](https://github.com/mohammaDJ23/expense-api/commit/f3d3743b60a7afa968c161ba3d34fc1bf5a9a747))
- 339587 update the FindUserListQuery arg ([b6a9d1f](https://github.com/mohammaDJ23/expense-api/commit/b6a9d1f2b82468a644c50edfff7459eec9668bd7))
- 339587 update the IsBillExistsByUserIdAndIdQuery arg ([1785f71](https://github.com/mohammaDJ23/expense-api/commit/1785f71dbb4f8cd4e13c77e09fadbb650e42738d))
- 339587 update the IsConsumerExistsByUserIdAndIdQuery arg ([8866efb](https://github.com/mohammaDJ23/expense-api/commit/8866efbdf5433ce94156663b095630baddab1c30))
- 339587 update the IsConsumerExistsByUserIdAndIdsQuery arg ([d28f364](https://github.com/mohammaDJ23/expense-api/commit/d28f364949db2d9cfa30ba671b25c483c371d5eb))
- 339587 update the IsLocationExistsByUserIdAndIdQuery arg ([50901e6](https://github.com/mohammaDJ23/expense-api/commit/50901e6154c666d108a2f3d50e65e4f49e07c321))
- 339587 update the IsReceiverExistsByUserIdAndIdQuery arg ([1044b11](https://github.com/mohammaDJ23/expense-api/commit/1044b11259ba7fa2e9267f7ab62f8db8db2b2a5a))
- 339587 update the IsUserExistsByEmailQuery arg ([86505bf](https://github.com/mohammaDJ23/expense-api/commit/86505bf9e717445af0a0b221e6e51c8ae8411629))
- 339587 update the IsUserExistsByIdQuery arg ([88cda98](https://github.com/mohammaDJ23/expense-api/commit/88cda984f65be381927c39b2e2ddc150a659523e))
- 339587 update the update user command arg ([5ef4077](https://github.com/mohammaDJ23/expense-api/commit/5ef407740074e7b92f8eb89bcf7ab92522005fa8))
- 339587 update the UpdateBillCommand arg ([0b8ca66](https://github.com/mohammaDJ23/expense-api/commit/0b8ca664c21c6892c2dcaf0c94a215cc33e06d42))
- 339587 update the UpdateConsumerCommand arg ([5c67720](https://github.com/mohammaDJ23/expense-api/commit/5c67720650ab36342f99767e4bc4c1a887ca0381))
- 339587 update the UpdateLocationCommand arg ([75dba78](https://github.com/mohammaDJ23/expense-api/commit/75dba788f607f46c891d28b0bc1b8d7ac35fafc0))
- 339587 update the UpdateReceiverCommand arg ([1c8e361](https://github.com/mohammaDJ23/expense-api/commit/1c8e3616ee3cacea93f2eb0ce8e2494a78ff149e))
- 686199 add Injectable ([2a6c819](https://github.com/mohammaDJ23/expense-api/commit/2a6c819666a2c3f7153966dfe207ac40fc7aeba6))
- 686199 add the events inside the consumer module ([f1d8928](https://github.com/mohammaDJ23/expense-api/commit/f1d89284c41280184c292015bef8458cd73e27b9))
- 686199 add the events inside the location modules ([b359128](https://github.com/mohammaDJ23/expense-api/commit/b359128ede1ecf1f84761f1953141dbfb3488ffb))
- 686199 add the events inside the receiver modules ([149ca18](https://github.com/mohammaDJ23/expense-api/commit/149ca18b3d5a37814be86c417d0d2b9eacf8b88c))
- 686199 add the outbox events to the bill module ([9b7eadf](https://github.com/mohammaDJ23/expense-api/commit/9b7eadfe08fddb6773fd7eaa6f59ab1fed684c02))
- 686199 add the outbox moduels ([8af65b7](https://github.com/mohammaDJ23/expense-api/commit/8af65b701ba2e7b54f58d0914102ff277c6ebabf))
- 686199 add the repo, commands and service of outbox module ([4822df4](https://github.com/mohammaDJ23/expense-api/commit/4822df4b55725885829d236d566ddd37eeda385b))
- 686199 add the updatedAt to ICreateEntity ([de315d3](https://github.com/mohammaDJ23/expense-api/commit/de315d36e08015468fba8a689b2ec5cce46fe80f))
- 686199 remove cqrs types ([3d24f8f](https://github.com/mohammaDJ23/expense-api/commit/3d24f8fc7fd9aabba95d71e7bc64de9b8b799d06))
- 686199 remove the unnecessary comment ([722d5ee](https://github.com/mohammaDJ23/expense-api/commit/722d5eec32bc5b02a6be2b92b71b0c3e7033b873))
- 686199 update the CreateOutboxEventCommand arg ([503e3e1](https://github.com/mohammaDJ23/expense-api/commit/503e3e100c1781d3cc6566d27c22db2b6b34b289))

## [4.0.1](https://github.com/mohammaDJ23/expense-api/compare/v4.0.0...v4.0.1) (2026-07-01)

### 🐛 Bug Fixes

- 951809 update the version of brace-expansion ([e5e33f9](https://github.com/mohammaDJ23/expense-api/commit/e5e33f92388d6c978ee9ef789f55944dca6e046c))
- 951809 update the version of brace-expansion ([66d9e10](https://github.com/mohammaDJ23/expense-api/commit/66d9e1050ac66c1f83048a5c36b900cc3a45137b))

### 🔧 Chores

- 951809 add the backup configuration ([24598d3](https://github.com/mohammaDJ23/expense-api/commit/24598d3e062d3d459d115813321a816a991eb7d3))
- 951809 add the knip config file ([514bdb0](https://github.com/mohammaDJ23/expense-api/commit/514bdb099ee3e9baaa4a4355b868da5b2686fa13))
- 951809 remove the backup config from docker development ([8218ce6](https://github.com/mohammaDJ23/expense-api/commit/8218ce6d1fafd30512f5f752ea0b640bd4ae02ea))
- 951809 remove the backup service ([3e17489](https://github.com/mohammaDJ23/expense-api/commit/3e17489ad702c3f45daf13eca64fe6c0da108f18))
- 951809 remove tne ignore property ([3b939cb](https://github.com/mohammaDJ23/expense-api/commit/3b939cbe8d29a7ce1af4aba68a51867a9c7de028))

## [4.0.0](https://github.com/mohammaDJ23/expense-api/compare/v3.9.3...v4.0.0) (2026-06-29)

### ✨ Features

- 700990 add the bill deletion ([accdbf9](https://github.com/mohammaDJ23/expense-api/commit/accdbf9a24230f21a8f12571e30fc779353c9228))
- 700990 add the delete user api ([e20d15c](https://github.com/mohammaDJ23/expense-api/commit/e20d15c2215913b4967373ecca99a2f58b3554fa))
- 700990 add update user api ([5200c5d](https://github.com/mohammaDJ23/expense-api/commit/5200c5d60dbf371f26003281751a33264c9f54a7))

### 💄 Breaking changes

- 700990 add the related cqrs, service and apis of bill ([188b843](https://github.com/mohammaDJ23/expense-api/commit/188b84371d5a668e3ff032269979401ad4f3b23e))
- 700990 add the related cqrs, service and apis of consumer ([5f5f377](https://github.com/mohammaDJ23/expense-api/commit/5f5f377cf6e85ae0fa67f001f16dad5ddbc80575))
- 700990 add the related cqrs, service and apis of consumer ([7cb4e46](https://github.com/mohammaDJ23/expense-api/commit/7cb4e46dfdfdb0f701d4cadbf5d288a223264404))
- 700990 add the related cqrs, service and apis of location ([37b15e5](https://github.com/mohammaDJ23/expense-api/commit/37b15e592b7f486ed16dd023187ebe8282ee1d6f))
- 700990 add the related cqrs, service and apis of receiver ([ce48fef](https://github.com/mohammaDJ23/expense-api/commit/ce48fef8f724f7576b7c932ba9193912a4bc76b8))
- 700990 add the related cqrs, service and apis of receiver ([79997b1](https://github.com/mohammaDJ23/expense-api/commit/79997b11adcc9b1eebd32595779e198e221e172b))
- 700990 add the related query and fix the type of repo ([d1fcec1](https://github.com/mohammaDJ23/expense-api/commit/d1fcec1d7c29c8e0fd6fd34511f9e475fcc4c61c))
- 700990 change the data relationships ([b8acaf6](https://github.com/mohammaDJ23/expense-api/commit/b8acaf68a979c871e81607a8c1eb0dcfcd24d1f8))

### 🔧 Chores

- 700990 add orderby ([dd372d2](https://github.com/mohammaDJ23/expense-api/commit/dd372d2b01097295dfba53ef583ba7433ab6a591))
- 700990 check if bills consumers created successfully ([480f893](https://github.com/mohammaDJ23/expense-api/commit/480f893111183c896f73a4e1fc90b74e05b8bd0b))
- 700990 remove the text ([837f467](https://github.com/mohammaDJ23/expense-api/commit/837f467f18dc655ede776f224ffdd73627016fd5))
- 700990 update some names ([aa86854](https://github.com/mohammaDJ23/expense-api/commit/aa86854021e17b91e9b915b410a85fada84256d7))
- 700990 update the error messages ([aa74059](https://github.com/mohammaDJ23/expense-api/commit/aa7405934d2cd39a5a00564234f4b7d6420689a1))
- 700990 update the names ([e9ad121](https://github.com/mohammaDJ23/expense-api/commit/e9ad1213a3f7cacb85ffe5373e911b3626fd9e70))

## [3.9.3](https://github.com/mohammaDJ23/expense-api/compare/v3.9.2...v3.9.3) (2026-06-26)

### 🔧 Chores

- 724123 add orderby ([e36ba52](https://github.com/mohammaDJ23/expense-api/commit/e36ba52c2f67efa22953cb42a94853ee7317fe93))
- 724123 add orderby ([a681564](https://github.com/mohammaDJ23/expense-api/commit/a681564667454c4b89c710115ba7c39b86bbe20a))
- 724123 add some options to pool ([fe7229c](https://github.com/mohammaDJ23/expense-api/commit/fe7229cc3dc74e30584c5ec53b2156495ddc1165))
- 724123 add the code block ([6069c09](https://github.com/mohammaDJ23/expense-api/commit/6069c09489185a7bc01e13a3b663b7ea3c784a85))
- 724123 add the proper index for bills ([bbe49a9](https://github.com/mohammaDJ23/expense-api/commit/bbe49a9f7009e4a98fb3718c2e303251cf0f452f))
- 724123 add the proper index for bills_consumers ([3197a23](https://github.com/mohammaDJ23/expense-api/commit/3197a23a6930781183664759ce69786e5c3dd4f0))
- 724123 add the proper index for users_consumers ([58a766d](https://github.com/mohammaDJ23/expense-api/commit/58a766dad73cee5beb9788b250b7a0b1f330e858))
- 724123 add the proper index for users_locations ([d721eec](https://github.com/mohammaDJ23/expense-api/commit/d721eec74fccf441e5c7e015dd7a44bf6200cfd6))
- 724123 add the proper index for users_receivers ([0a29836](https://github.com/mohammaDJ23/expense-api/commit/0a29836c5ee16c0c9f5cef29507792ac72970eaa))
- 724123 check the connection ([6381b2b](https://github.com/mohammaDJ23/expense-api/commit/6381b2b9350179586f94a382123f7928d9666e80))
- 724123 use false for SSL right now ([0d5b993](https://github.com/mohammaDJ23/expense-api/commit/0d5b993eee1f39ec21389a0bbe0853de3ececfae))

## [3.9.2](https://github.com/mohammaDJ23/expense-api/compare/v3.9.1...v3.9.2) (2026-06-25)

### ♻️ Code Refactoring

- 054250 add output type ([935c6bd](https://github.com/mohammaDJ23/expense-api/commit/935c6bd56f12c511918662edee7e28ca72e72bd2))
- 054250 add the local password and verified verification mailer ([ec6c148](https://github.com/mohammaDJ23/expense-api/commit/ec6c1485bf57bca9a23bdffd02cb2347fa45e9e3))
- 054250 remove the methods and use logic direcly ([76e4ccd](https://github.com/mohammaDJ23/expense-api/commit/76e4ccd8f7dda1c1d9bdbd4222943ef2641b5662))
- 054250 rename IFindManyTargetsByRefIdsRepository ([a2273ca](https://github.com/mohammaDJ23/expense-api/commit/a2273ca0f83cae74f139d4ef73851777363235c9))
- 054250 rename the repo name ([1b9dbcf](https://github.com/mohammaDJ23/expense-api/commit/1b9dbcfb9dbdb8607f40dbaee687dec44050dc14))
- 054250 update the respnoses message names ([5724f0c](https://github.com/mohammaDJ23/expense-api/commit/5724f0ce818b03fb26e15de7c999ff0e5c147cb2))
- 054250 use generic type ([443c409](https://github.com/mohammaDJ23/expense-api/commit/443c409488fc908a2de30ef5c5befb30fcb20d3b))
- 054250 use isEmpty ([5161982](https://github.com/mohammaDJ23/expense-api/commit/5161982a355674ffc1c45b6f449042542c1ec154))
- 054250 use isNotEmpty ([5f7d1ec](https://github.com/mohammaDJ23/expense-api/commit/5f7d1ec42a1cf568389cfe551831bf84a42326df))

## [3.9.1](https://github.com/mohammaDJ23/expense-api/compare/v3.9.0...v3.9.1) (2026-06-25)

### 🐛 Bug Fixes

- 466239 rename the method name ([e8cd802](https://github.com/mohammaDJ23/expense-api/commit/e8cd80289cee90e4ebec0af18053313add16016d))

### 🔧 Chores

- 466239 add isUserConsumerExistsByRefIdAndTargetId repo ([be7fd82](https://github.com/mohammaDJ23/expense-api/commit/be7fd82efac20dcf227a704c11e4bc67a1d67f41))
- 466239 add isUserConsumerExistsByRefIdAndTargetIds repo ([f0cf64c](https://github.com/mohammaDJ23/expense-api/commit/f0cf64c2c1cf132c507bcfbefa628e7662095b26))
- 466239 add isUserLocationExistsByRefIdAndTargetId repo ([fd0bb1a](https://github.com/mohammaDJ23/expense-api/commit/fd0bb1a9a92517201111fd2e363ee0828113c056))
- 466239 add isUserReceiverExistsByRefIdAndTargetId repo ([a8d3ae3](https://github.com/mohammaDJ23/expense-api/commit/a8d3ae3f0d55c9d92261bf7496219ae984319b5b))
- 466239 remove the isExistsById repository ([cbcb44c](https://github.com/mohammaDJ23/expense-api/commit/cbcb44cecf6d99ad7e0e7520c267b8a87d0b9d8f))
- 466239 use the userLocation, userReceiver and userConsumer queries ([ec5d96e](https://github.com/mohammaDJ23/expense-api/commit/ec5d96edab905ec50c1adcd9a6961df506af21b1))

## [3.9.0](https://github.com/mohammaDJ23/expense-api/compare/v3.8.0...v3.9.0) (2026-06-24)

### ✨ Features

- 542092 add the update bill api ([6f89a54](https://github.com/mohammaDJ23/expense-api/commit/6f89a54cd1553060908daaf6dcd71cc5feba9f94))

### ♻️ Code Refactoring

- 542092 use blocks to organize the code ([de8c85a](https://github.com/mohammaDJ23/expense-api/commit/de8c85a213fb660e4ee2760994c93a4e9cb3c173))
- 542092 use blocks to organize the code ([192654d](https://github.com/mohammaDJ23/expense-api/commit/192654de66d9c18095876970d5d31cec2590c952))

## [3.8.0](https://github.com/mohammaDJ23/expense-api/compare/v3.7.0...v3.8.0) (2026-06-24)

### ✨ Features

- 833826 add the consumer creation api ([3989558](https://github.com/mohammaDJ23/expense-api/commit/39895588b6b12eafe773a67f2b159425d604f013))

### ♻️ Code Refactoring

- 833826 move the drizzle transformer to the related file ([3dc7ca3](https://github.com/mohammaDJ23/expense-api/commit/3dc7ca312415404d4950cc02b80f55da569894a9))
- 833826 remove dead codes ([dca2c31](https://github.com/mohammaDJ23/expense-api/commit/dca2c31177d1f08580000b50e0423649808f101d))
- 833826 update the bill creation process ([bde9b49](https://github.com/mohammaDJ23/expense-api/commit/bde9b4943e564358287c3e63dfea9132634b23fa))

### 🔧 Chores

- 833826 add knip ([5a1b3ba](https://github.com/mohammaDJ23/expense-api/commit/5a1b3ba979e1b0c9e49b8c47d3cbc08b0b44e9f7))
- 833826 add knip ([23deeaf](https://github.com/mohammaDJ23/expense-api/commit/23deeaf8c1a25fd2d4d137b16e1fcf4d86aa9350))
- 833826 add knip command ([6c9f228](https://github.com/mohammaDJ23/expense-api/commit/6c9f2281031fa4c6c616df6c2c9edb7f4efb29ab))

## [3.7.0](https://github.com/mohammaDJ23/expense-api/compare/v3.6.0...v3.7.0) (2026-06-23)

### ✨ Features

- 968638 add the location creation api ([3ff8196](https://github.com/mohammaDJ23/expense-api/commit/3ff819601c7d2ae1fbae4d88dfd02ac195cb646b))

## [3.6.0](https://github.com/mohammaDJ23/expense-api/compare/v3.5.0...v3.6.0) (2026-06-23)

### ✨ Features

- 415500 add the receiver creation api ([b09cf5f](https://github.com/mohammaDJ23/expense-api/commit/b09cf5f3bf5f82e67f66042c5ffc66b99f49721b))

## [3.5.0](https://github.com/mohammaDJ23/expense-api/compare/v3.4.0...v3.5.0) (2026-06-22)

### ✨ Features

- 953310 add the consumer api ([d093d9d](https://github.com/mohammaDJ23/expense-api/commit/d093d9d7623ecaf5ec74643f7ec0b07a8638d956))

## [3.4.0](https://github.com/mohammaDJ23/expense-api/compare/v3.3.0...v3.4.0) (2026-06-22)

### ✨ Features

- 536448 add getting the consumers target api ([b45481b](https://github.com/mohammaDJ23/expense-api/commit/b45481b8bfaa4a2f3a4667a2c4eef50d5aff3df0))

## [3.3.0](https://github.com/mohammaDJ23/expense-api/compare/v3.2.0...v3.3.0) (2026-06-21)

### ✨ Features

- 428924 add the location api ([e15c514](https://github.com/mohammaDJ23/expense-api/commit/e15c5143c5655731537181bc01134c50b0cfb635))

## [3.2.0](https://github.com/mohammaDJ23/expense-api/compare/v3.1.0...v3.2.0) (2026-06-21)

### ✨ Features

- 309061 add getting location list api ([5bbcb1b](https://github.com/mohammaDJ23/expense-api/commit/5bbcb1be6d907d346da9e739ec984e6b75c8c0d3))

### 🔧 Chores

- 325796 add orderBy ([bbbd9de](https://github.com/mohammaDJ23/expense-api/commit/bbbd9de6ade664bec8929f311711c00a1786b85a))

## [3.1.0](https://github.com/mohammaDJ23/expense-api/compare/v3.0.0...v3.1.0) (2026-06-21)

### ✨ Features

- 193049 add the getting receiver api ([7177fb3](https://github.com/mohammaDJ23/expense-api/commit/7177fb3d1bc5664f8e18cf7de0887d90ddce8edf))
- 636067 add the getting receiver list api ([565a1de](https://github.com/mohammaDJ23/expense-api/commit/565a1debd13792776997b99685edae67835eb7d7))

### 🔧 Chores

- 310686 use auto for endOfLine ([52216d5](https://github.com/mohammaDJ23/expense-api/commit/52216d5a50e8ad877a372f2e7151ea99a63c96e0))

## [3.0.0](https://github.com/mohammaDJ23/expense-api/compare/v2.4.1...v3.0.0) (2026-06-21)

### ✨ Features

- 380591 add the joined bill consumer api ([75e2b5b](https://github.com/mohammaDJ23/expense-api/commit/75e2b5b6fda8199d89ff1ab196f7ed653a359023))
- 380591 add the joined user location api ([28aaadc](https://github.com/mohammaDJ23/expense-api/commit/28aaadc4145839665651af305288b0751e892bd9))
- 380591 add the joined user receiver api ([5bbb20c](https://github.com/mohammaDJ23/expense-api/commit/5bbb20c68cbf0bfc50b522cbbd5160e048b21bd7))
- 649960 add GetManyJoinedUsersLocationsById ([be3bd7d](https://github.com/mohammaDJ23/expense-api/commit/be3bd7dd9267a632ea05c962968c63ce8af04cfa))
- 649960 add GetManyJoinedUsersReceiversById ([8c47a8c](https://github.com/mohammaDJ23/expense-api/commit/8c47a8c386b293616c0158924c5fb022ada354f3))
- 649960 update the get and get many of bill with new queries and services ([f4491ab](https://github.com/mohammaDJ23/expense-api/commit/f4491ab84c56e876ebd83bd4cd115bbec295d54d))

### 🐛 Bug Fixes

- 649960 use ! sign ([db62082](https://github.com/mohammaDJ23/expense-api/commit/db620827dadd4593712a111eb4655f9149476227))
- 649960 use plain object ([78fcfd7](https://github.com/mohammaDJ23/expense-api/commit/78fcfd7fd10456ebcfdd6a3514e68862e27e3e6e))
- 874920 conver to protected ([1bf04b3](https://github.com/mohammaDJ23/expense-api/commit/1bf04b3d67040b7052ed52da4b35a1a6c8b929b1))
- 874920 get just location and receiver ([2ec046e](https://github.com/mohammaDJ23/expense-api/commit/2ec046e7c407248345608fc9dc16ee0181a8d724))
- 874920 use bill id ([66c5543](https://github.com/mohammaDJ23/expense-api/commit/66c5543c42abde380e8cd7141b0e5c46bd0ad159))

### ♻️ Code Refactoring

- 614766 remove the receiver api ([af73c0d](https://github.com/mohammaDJ23/expense-api/commit/af73c0d85b575d8b59fe1b09c052e1b0d9127d06))

### 💄 Breaking changes

- 874920 remove the services, rename the commands and queries and redefine the repository types ([1c9da0e](https://github.com/mohammaDJ23/expense-api/commit/1c9da0e368397583342ce86b724029c9d30186d1))
- 874920 remove the services, rename the commands and queries and redefine the repository types of the authentication module ([6bcd203](https://github.com/mohammaDJ23/expense-api/commit/6bcd2030698f66472a2f5641e81def68985b6b9b))
- 874920 remove the services, rename the commands and queries and redefine the repository types of the bill module ([92489b2](https://github.com/mohammaDJ23/expense-api/commit/92489b2231c337a4f868f4bc26fe502946887e29))
- 874920 remove the services, rename the commands and queries and redefine the repository types of the consumer module ([55fe746](https://github.com/mohammaDJ23/expense-api/commit/55fe74615ff21657992be4baa78cc41ada38849b))
- 874920 remove the services, rename the commands and queries and redefine the repository types of the location module ([05ee1c3](https://github.com/mohammaDJ23/expense-api/commit/05ee1c309877422c9f3a8bbbbc7b5e350fd6d72e))
- 874920 remove the services, rename the commands and queries and redefine the repository types of the receiver module ([224615e](https://github.com/mohammaDJ23/expense-api/commit/224615e02cee1d5e5770e9afabc146fe4ac7d74e))
- 874920 rename the service of the health module ([a4f299a](https://github.com/mohammaDJ23/expense-api/commit/a4f299a643a7942260f57f9be9ecb26a71c1734a))
- 874920 use the commands and quries in the core files ([6b64b54](https://github.com/mohammaDJ23/expense-api/commit/6b64b5421af7b3af5f1281b6995a472e19a3fc90))

### 🔧 Chores

- 614766 update the packages ([c8a50d8](https://github.com/mohammaDJ23/expense-api/commit/c8a50d8a3a7b9a1271ea0e7b2a5458088c5d3bec))
- 614766 update the packages ([e9fc221](https://github.com/mohammaDJ23/expense-api/commit/e9fc221635d2bac76141b3c4b470af8228f2bab8))
- 649960 add compression ([2831dde](https://github.com/mohammaDJ23/expense-api/commit/2831dde83affd23bd127a35511b2776681544326))
- 649960 add IJunctionRepository ([f61384d](https://github.com/mohammaDJ23/expense-api/commit/f61384d1795efc70810f4f145066e7d06fe5a361))
- 649960 add the get many bills api ([254cce6](https://github.com/mohammaDJ23/expense-api/commit/254cce665483785cbade153474689aabccc465f2))
- 649960 add the types of comprassion ([d894e65](https://github.com/mohammaDJ23/expense-api/commit/d894e65b30f4ac39c952997f14a3b0f6920bac56))
- 649960 check the not found exception ([f324369](https://github.com/mohammaDJ23/expense-api/commit/f3243691362888f113d060183758051254f7b503))
- 649960 remove prepare at all ([5a88881](https://github.com/mohammaDJ23/expense-api/commit/5a88881cc959317e2264c0f38e58fb992b270c70))
- 649960 remove the maps ([436b9df](https://github.com/mohammaDJ23/expense-api/commit/436b9df6289dcf9bb1aa978b1072e7fa5265014e))
- 649960 run linter to the file ([a92173f](https://github.com/mohammaDJ23/expense-api/commit/a92173f7c6bcbe54fd2ac242b95cdf4d9c1a9c1e))
- 694960 do not extends to DrizzleRepository ([f949429](https://github.com/mohammaDJ23/expense-api/commit/f94942977a6d5226c76732d6654600dbdba2c837))
- 874920 add the repository interfaceses ([5eba70a](https://github.com/mohammaDJ23/expense-api/commit/5eba70a17005713d096d9ad14f8c64e5b90249be))
- 874920 import the injectable services ([a151a61](https://github.com/mohammaDJ23/expense-api/commit/a151a6162bfcec379b39265b81f3c72ad532fd60))
- 874920 move the me api ([083907f](https://github.com/mohammaDJ23/expense-api/commit/083907fdf0a5bfccf4acfe0ff9d7d303158d2d05))
- 874920 remove unused moduels inside core ([712604a](https://github.com/mohammaDJ23/expense-api/commit/712604a885e8bf11fef4000f87033af8ef37502b))
- 874920 use maximum limit ([e87ff89](https://github.com/mohammaDJ23/expense-api/commit/e87ff890b442d9be95f66d04e1bc3fe6c8890e07))
- 896074 update the logic of create bill ([227348c](https://github.com/mohammaDJ23/expense-api/commit/227348caaba7fff0851e205f96f825a6ac415e09))
- 896074 update the service of get bill ([3330447](https://github.com/mohammaDJ23/expense-api/commit/3330447526fdb7f94f0c3b62ead9dd03082dedb7))

## [2.4.1](https://github.com/mohammaDJ23/expense-api/compare/v2.4.0...v2.4.1) (2026-06-18)

### ♻️ Code Refactoring

- 614766 add the bill interface which has joind properties ([fb53868](https://github.com/mohammaDJ23/expense-api/commit/fb5386834f60714274a545c0f70378da2fefa2ac))
- 614766 move omitUndefined to the service ([87170cd](https://github.com/mohammaDJ23/expense-api/commit/87170cdfc55335e2d6fd08581e897a60cdbc8640))
- 614766 move out owner guard to core ([69e9df2](https://github.com/mohammaDJ23/expense-api/commit/69e9df2d02d3ba40bedfac29d66889ba9ea5decc))
- 614766 rename the dtos ([136d628](https://github.com/mohammaDJ23/expense-api/commit/136d62829b199075a700cba87ce1777df48e06ef))
- 614766 rename the prepare ([a60e71e](https://github.com/mohammaDJ23/expense-api/commit/a60e71e72d6963a2858e65030e691cc2b0c1fab5))
- 614766 use prepare and exexute ([749affb](https://github.com/mohammaDJ23/expense-api/commit/749affbfffac0416aabc454b9d4af29187740aa2))

## [2.4.0](https://github.com/mohammaDJ23/expense-api/compare/v2.3.0...v2.4.0) (2026-06-18)

### ✨ Features

- 603816 add get receiver api ([8a4c228](https://github.com/mohammaDJ23/expense-api/commit/8a4c22869f318f78dbf21f374645c60bfacd71b2))

## [2.3.0](https://github.com/mohammaDJ23/expense-api/compare/v2.2.0...v2.3.0) (2026-06-18)

### ✨ Features

- 150819 add the get user api ([483b326](https://github.com/mohammaDJ23/expense-api/commit/483b3263f403b3c9f2a576f1e0db7ebc7554c939))
- 992985 add the get many users api ([9e35c65](https://github.com/mohammaDJ23/expense-api/commit/9e35c654fad13eec413aaa2abbc173344fa1fe65))

### 🔧 Chores

- 299674 add the owner guard ([a5b9b29](https://github.com/mohammaDJ23/expense-api/commit/a5b9b29e2c5a8669aff83d1110cf9e5227806ca8))

## [2.2.0](https://github.com/mohammaDJ23/expense-api/compare/v2.1.0...v2.2.0) (2026-06-17)

### ✨ Features

- 955211 add the get user (me) api ([5bad6dc](https://github.com/mohammaDJ23/expense-api/commit/5bad6dcfc1f295059353cb749f644e41c3e4d60c))

## [2.1.0](https://github.com/mohammaDJ23/expense-api/compare/v2.0.0...v2.1.0) (2026-06-17)

### ✨ Features

- 905315 add the get bill api ([6127b90](https://github.com/mohammaDJ23/expense-api/commit/6127b902a2bd92548d5ddd2d0a8d8034f51e1be2))

### 🔧 Chores

- 479011 remove the extra exceptions ([3609a74](https://github.com/mohammaDJ23/expense-api/commit/3609a743b80b3712111b5628239bf0c36c23bb49))

## [2.0.0](https://github.com/mohammaDJ23/expense-api/compare/v1.4.0...v2.0.0) (2026-06-17)

### ✨ Features

- 895031 add createBillCommand and its repo ([58ebbe9](https://github.com/mohammaDJ23/expense-api/commit/58ebbe9e0dcf6ccd17237b94156b9f3c7161043b))
- 895031 add createLocation command and getLocationByIdOrNull query and their repo ([1149945](https://github.com/mohammaDJ23/expense-api/commit/114994538854ff02839c73d8fdc672077d244d60))
- 895031 add CreateManyBillConsumer query and its repo ([da6ee7b](https://github.com/mohammaDJ23/expense-api/commit/da6ee7b837018ec69663ba5a8ac8bbb02a038999))
- 895031 add CreateManyConsumers command and GetManyConsumersByName query and their repos ([ea3b6c2](https://github.com/mohammaDJ23/expense-api/commit/ea3b6c227c8bf2146f3e56d7d16dd6d02b814d09))
- 895031 add createReceiver command and getReceiverByIdOrNull query and their repo ([68b4d26](https://github.com/mohammaDJ23/expense-api/commit/68b4d26f1f18145a17706299ac9e480bfe445ad4))
- 895031 add getConsumerByNameOrNull query and repo ([d19c1ea](https://github.com/mohammaDJ23/expense-api/commit/d19c1eae10c02b80188dc218769aa6bcb511ae4f))
- 895031 add GetUserConsumerByIdOrNullQuery and CreateUserConsumerCommand and their repos ([46db11e](https://github.com/mohammaDJ23/expense-api/commit/46db11ef62340a16af4ce14ddf8d47a43689d108))
- 895031 add GetUserLocationByIdOrNullQuery and CreateUserLocationCommand and their repos ([6443ba6](https://github.com/mohammaDJ23/expense-api/commit/6443ba6e3fb3e081411c6f9d192ff76cfcee00bd))
- 895031 add GetUserReceiverByIdOrNullQuery and CreateUserReceiverCommand and their repos ([8b1f94f](https://github.com/mohammaDJ23/expense-api/commit/8b1f94f27c4fba36cfd9fa8f79149d8cb2778818))
- 895031 add the create consumer command and repo ([03dbbe3](https://github.com/mohammaDJ23/expense-api/commit/03dbbe354473f93e36e6343813ae96879a2fa4b6))
- 895031 add the get consumer by id or null query and repo ([ce2b510](https://github.com/mohammaDJ23/expense-api/commit/ce2b51053336fbf8a2682af75847ec7d268f8db9))
- 895031 create the user location service and use the getOrCreate method ([e72611a](https://github.com/mohammaDJ23/expense-api/commit/e72611a1b07812564d123a4a4e90e71195d15664))
- 895031 create the user receiver service and use the getOrCreate method ([f0640cf](https://github.com/mohammaDJ23/expense-api/commit/f0640cf0a2deaa496c683f9757b32edcc69175d1))

### 🐛 Bug Fixes

- 895031 update the path of consumer ([c20c4c8](https://github.com/mohammaDJ23/expense-api/commit/c20c4c89a38c3f8491a1df84e94a4e4256e5a7d1))
- 895031 use each property ([785e288](https://github.com/mohammaDJ23/expense-api/commit/785e288fc9c9a72fcd07955856aeacd7642613c6))
- 895031 use override ([164f866](https://github.com/mohammaDJ23/expense-api/commit/164f8667b2f02761519566c1d1d673d68b22e3e6))

### 💄 Breaking changes

- 970655 add createUserService ([5414231](https://github.com/mohammaDJ23/expense-api/commit/5414231a4c625b8eaa589215e0fb402786f3bd37))
- 970655 add createUserService ([8ce14fc](https://github.com/mohammaDJ23/expense-api/commit/8ce14fca160abe80c3aa426b3804ca924d566775))
- 970655 add GetUserByEmailOrNullService ([1fd492b](https://github.com/mohammaDJ23/expense-api/commit/1fd492b73832167977477614f9e7cf15b5206ae7))
- 970655 add GetUserByIdOrNullService ([9598099](https://github.com/mohammaDJ23/expense-api/commit/959809930d9215569f179e1261d53237a2aba8f7))
- 970655 add IsUserExistsByEmailService ([da76129](https://github.com/mohammaDJ23/expense-api/commit/da761297f9c201e9fb7d5e0263d45c49d0f40f74))
- 970655 add IsUserExistsByEmailService ([cb4bd57](https://github.com/mohammaDJ23/expense-api/commit/cb4bd576ce08f023e52507f10256774d4b1d2c05))
- 970655 add updateUserService ([51ec3d3](https://github.com/mohammaDJ23/expense-api/commit/51ec3d33c573903a1c1b332479375055377b0df1))
- 970655 remove unnessesary services ([ed720e2](https://github.com/mohammaDJ23/expense-api/commit/ed720e224bb1a3cce34e2f102ed60628563bbfec))
- 970655 use IServiceHandler for AccessTokenService ([7d070a5](https://github.com/mohammaDJ23/expense-api/commit/7d070a575bd8bd64d3a4ca5fd6e0a75174ad9170))
- 970655 use IServiceHandler for DeleteManyNotVerifiedUsersService ([df23b63](https://github.com/mohammaDJ23/expense-api/commit/df23b635ad6a86a90288794ef568bea0f0cc6b27))
- 970655 use IServiceHandler for GoogleLoginService ([c053296](https://github.com/mohammaDJ23/expense-api/commit/c0532968fd25aff1a9b58881897c3c21184feedd))
- 970655 use IServiceHandler for LocalForgotPasswordService ([9dcc7fe](https://github.com/mohammaDJ23/expense-api/commit/9dcc7fe69516e897c9b26f1209c688f7bb3e7cd8))
- 970655 use IServiceHandler for LocalLoginService ([aa513ea](https://github.com/mohammaDJ23/expense-api/commit/aa513eaf27dc60f3fda11bb2bac5f6d629c4721b))
- 970655 use IServiceHandler for LocalResetPasswordService ([3ad9be9](https://github.com/mohammaDJ23/expense-api/commit/3ad9be9ba8837f7fd5267639d9fd1ebe68ed3a43))
- 970655 use IServiceHandler for LocalSendVerificationService ([97c2dfa](https://github.com/mohammaDJ23/expense-api/commit/97c2dfad3a695e2632cdb5a9881077eb475770d6))
- 970655 use IServiceHandler for LocalSignupService ([7c9f7d6](https://github.com/mohammaDJ23/expense-api/commit/7c9f7d6d8ef6613ec1d1be525ce62447e6f51e96))
- 970655 use IServiceHandler for LocalVerifyVerificationService ([51f158e](https://github.com/mohammaDJ23/expense-api/commit/51f158e29e6f2abd32238f8b4c0aee6f76f1da6f))
- 970655 use IServiceHandler for PasswordMailerService ([14fa7ac](https://github.com/mohammaDJ23/expense-api/commit/14fa7ac917b70c632fdd6c5fdebb373e7b1cf5f1))
- 970655 use IServiceHandler for the bill services ([8dbc29a](https://github.com/mohammaDJ23/expense-api/commit/8dbc29a58e9483e4949beea692413ebe45e27afb))
- 970655 use IServiceHandler for the consumers services ([846892d](https://github.com/mohammaDJ23/expense-api/commit/846892d2be3ca5274e13eef22c18aa8a0fb7f9fc))
- 970655 use IServiceHandler for the create many billsConsumers services ([91563e6](https://github.com/mohammaDJ23/expense-api/commit/91563e605a1361e429128a0e5f3f501b7ebee1cf))
- 970655 use IServiceHandler for the get health services ([ecc95c5](https://github.com/mohammaDJ23/expense-api/commit/ecc95c5368f067e8712bc8cf0f3877b9b5dc1e69))
- 970655 use IServiceHandler for the location services ([069189a](https://github.com/mohammaDJ23/expense-api/commit/069189a00b5d4f6927a32d618d7c42b3a8fd75d5))
- 970655 use IServiceHandler for the receiver services ([f9ee103](https://github.com/mohammaDJ23/expense-api/commit/f9ee1035da3db8016d988bcc757b928d0a845e43))
- 970655 use IServiceHandler for the user location services ([175700d](https://github.com/mohammaDJ23/expense-api/commit/175700d7b0e41eee57b19f4d9f823f0c82e9a4a0))
- 970655 use IServiceHandler for the user receiver services ([1fedc87](https://github.com/mohammaDJ23/expense-api/commit/1fedc8781eb8b7e856ab14fc3e22a97f442e6dd4))
- 970655 use IServiceHandler for the users consumers services ([9297344](https://github.com/mohammaDJ23/expense-api/commit/92973445c740289873ffd3fae2541c4934256434))
- 970655 use IServiceHandler for VerificationMailerService ([4bc00e4](https://github.com/mohammaDJ23/expense-api/commit/4bc00e498eed690ee429bf127bd7671f6657187e))
- 970655 use the services inside controllers ([4e2ed35](https://github.com/mohammaDJ23/expense-api/commit/4e2ed3525e6e92a711ab2fb1468bf628d98909ac))

### 🔧 Chores

- 895031 add esbuild at overrides ([4ce62bf](https://github.com/mohammaDJ23/expense-api/commit/4ce62bf9ecf0c91506ace58d9f390224cb808187))
- 895031 add esbuild at overrides ([e55c163](https://github.com/mohammaDJ23/expense-api/commit/e55c163e9b1d3eaa7e69cdb7ded264993aa9c95c))
- 895031 add getNamesForCreation and concatExistencesWithCreated ([e01ada0](https://github.com/mohammaDJ23/expense-api/commit/e01ada03b39cc60f4ffa474d8c1b3d6cd363b53d))
- 895031 add the bill abstract and interface ([2305d42](https://github.com/mohammaDJ23/expense-api/commit/2305d42c2fc7112949e74dff46ce7a5d4c5a603f))
- 895031 add the bill controller ([9d514c5](https://github.com/mohammaDJ23/expense-api/commit/9d514c5430937980bdf702542203e90725dc2d57))
- 895031 add the billConsumer service ([7657de7](https://github.com/mohammaDJ23/expense-api/commit/7657de75e74c74ec17178c87f2aa6062fe9474de))
- 895031 add the consumer service ([f93bf4a](https://github.com/mohammaDJ23/expense-api/commit/f93bf4afced832d2c259e4f8f26fb5762891d5cd))
- 895031 add the consumer, location and receiver modules ([67761fb](https://github.com/mohammaDJ23/expense-api/commit/67761fbcc15feacd8aa56afc2e1ff2c85607b9ed))
- 895031 add the create bill dto ([5a578e6](https://github.com/mohammaDJ23/expense-api/commit/5a578e6cc1df75749f4d08b0b97a4e36faaa25f0))
- 895031 add the dto of getManyBills ([19bf84e](https://github.com/mohammaDJ23/expense-api/commit/19bf84e466335fed7fa085d83f3c72cc719676b3))
- 895031 add the getMany query and its logic and repo ([0eaceb3](https://github.com/mohammaDJ23/expense-api/commit/0eaceb3df7e2c07a7b96b93f2c106a902dbd3a90))
- 895031 add the location service ([dc60317](https://github.com/mohammaDJ23/expense-api/commit/dc60317276b0983927e84f72ed80249faaa65679))
- 895031 add the receiver service ([5f02018](https://github.com/mohammaDJ23/expense-api/commit/5f020180c842c8642c7d517fd592a33b16e5407f))
- 895031 add the service of UserConsumer ([795ff17](https://github.com/mohammaDJ23/expense-api/commit/795ff175fc08f6d515389abbf35f416f4cfc057d))
- 895031 change the onDelete option ([8fd0907](https://github.com/mohammaDJ23/expense-api/commit/8fd090733aa4f65bc1f4b5a9f9772cedca9dc7ea))
- 895031 change the relation of bill and consumer ([006da48](https://github.com/mohammaDJ23/expense-api/commit/006da483861328366b65aae3573329bc274af203))
- 895031 conver date to string ([b438e80](https://github.com/mohammaDJ23/expense-api/commit/b438e8083c56296f984de6bbf732849deb96c1d4))
- 895031 conver date to string ([1c94435](https://github.com/mohammaDJ23/expense-api/commit/1c94435ca5c126b3bac4dc4858ef6c391e962788))
- 895031 conver date to string ([1de31fc](https://github.com/mohammaDJ23/expense-api/commit/1de31fc1bcf486a57d76527560f1bc212e4b8b8b))
- 895031 convet dates to string ([71846f3](https://github.com/mohammaDJ23/expense-api/commit/71846f340f4e2e641be995f8562798f3fdb4fbf3))
- 895031 convet dates to string ([6dbf8f8](https://github.com/mohammaDJ23/expense-api/commit/6dbf8f8a2eb1fd920defd58d4a75a45cd4b670fa))
- 895031 convet dates to string ([d153ee5](https://github.com/mohammaDJ23/expense-api/commit/d153ee5952799b62ea7ac77ec91dc65b70772c21))
- 895031 convet dates to string ([af5f6bd](https://github.com/mohammaDJ23/expense-api/commit/af5f6bd1375555424f0cf58396de2f2e55ee735f))
- 895031 do not use required ([3137cfb](https://github.com/mohammaDJ23/expense-api/commit/3137cfb13895d5c4854a300c6e718d6b5e156caa))
- 895031 export the services ([1cfb728](https://github.com/mohammaDJ23/expense-api/commit/1cfb728796119d249c13a444fe5158c203413524))
- 895031 import AuthenticationModule ([e3225fe](https://github.com/mohammaDJ23/expense-api/commit/e3225fe3d1372d11f683a6dcd240289e2ed2cc53))
- 895031 import the needed modules ([2852475](https://github.com/mohammaDJ23/expense-api/commit/2852475fa15d5836a3e428300624cb4cc02d2c85))
- 895031 make some changes to create bill dto ([4f68043](https://github.com/mohammaDJ23/expense-api/commit/4f6804347bf55cc70577aafeeef48c2dacc9f70f))
- 895031 move out the creation of consumers, location and receiver for user ([68ce57e](https://github.com/mohammaDJ23/expense-api/commit/68ce57e5d4b2134ba039e6852fdfc66bbe7bfde4))
- 895031 move the services logic into the related services ([4bdfb5b](https://github.com/mohammaDJ23/expense-api/commit/4bdfb5baa9be40cde39b50a7fd2466ce2663fd6d))
- 895031 read directly inside the folder ([120b4da](https://github.com/mohammaDJ23/expense-api/commit/120b4da8083a867b1bb97662d457fc49be55534b))
- 895031 remove consumerId ([10bf806](https://github.com/mohammaDJ23/expense-api/commit/10bf806b636fcd243dede9afe50eb08c308b47ea))
- 895031 remove CreateConsumer command and GetConsumerByNameOrNull query and their repos ([b73f1b2](https://github.com/mohammaDJ23/expense-api/commit/b73f1b24377d24ed25076e7c9720b7debfba24da))
- 895031 remove CreateConsumer command and GetConsumerByNameOrNull query and their repos ([8275eec](https://github.com/mohammaDJ23/expense-api/commit/8275eec7cfd3fda6b563f4aea1ca2287cf0d8fa2))
- 895031 remove getConsumerByIdOrNull query and repo ([cff6acb](https://github.com/mohammaDJ23/expense-api/commit/cff6acb67abd7989cbd481311a8916fe2f2040b9))
- 895031 remove the type ([15c7f08](https://github.com/mohammaDJ23/expense-api/commit/15c7f0865fc1e14f8adaa20a31309f7a6389dbc4))
- 895031 remove unused query and repo ([a7ca143](https://github.com/mohammaDJ23/expense-api/commit/a7ca1432f3cba81826e3b09dd984996fc69d694e))
- 895031 remove unused query and repo ([b4832fe](https://github.com/mohammaDJ23/expense-api/commit/b4832fe8dc345e5657600ad1c72be24158567f9c))
- 895031 rename consumers to consumer ([2f1d294](https://github.com/mohammaDJ23/expense-api/commit/2f1d29431fa24f5b047817b8f5eea394a9c3c6d2))
- 895031 rename consumers to consumer ([df00cb1](https://github.com/mohammaDJ23/expense-api/commit/df00cb14d34a6277132ebefeb5304fa61b25f9b3))
- 895031 rename createConsumerService ([ed103b9](https://github.com/mohammaDJ23/expense-api/commit/ed103b9aa182e3bdea40134d4839bc52db9b25f3))
- 895031 rename CreateManyBillsConsumers ([dad4e0e](https://github.com/mohammaDJ23/expense-api/commit/dad4e0ea14d05de2f683eb7a53136b84fcb7ad2b))
- 895031 rename CreateManyUsersConsumers ([4cce00c](https://github.com/mohammaDJ23/expense-api/commit/4cce00c5a1f281f914dc5dea492cc181191368ef))
- 895031 rename deleteManyNotVerifiedUsers ([dab9d73](https://github.com/mohammaDJ23/expense-api/commit/dab9d73633745e8240ba0f9000026fe526e1ff2d))
- 895031 rename GetManyUsersConsumersById ([bcd33f9](https://github.com/mohammaDJ23/expense-api/commit/bcd33f931bf284f6385db55e515bcf9ae94bf44a))
- 895031 rename the functions ([8ed0846](https://github.com/mohammaDJ23/expense-api/commit/8ed084651a0128a66c482a14022e19d130956f2f))
- 895031 rename the method ([a9716eb](https://github.com/mohammaDJ23/expense-api/commit/a9716eb17800ea83b544d0871aa914cd1d7c7048))
- 895031 rename the methods becuase of the needed logics ([b9f62a2](https://github.com/mohammaDJ23/expense-api/commit/b9f62a2787d17977d4fa8371d0062e6737794e6c))
- 895031 rename the module name and remove the types ([7606164](https://github.com/mohammaDJ23/expense-api/commit/7606164e895e49e353bc7b9b845168f3dd33d513))
- 895031 rename the user abstract interface ([5fb225a](https://github.com/mohammaDJ23/expense-api/commit/5fb225a31a9b56429c489ab8d17ac02d057de121))
- 895031 rename the user and reponses files ([03c30de](https://github.com/mohammaDJ23/expense-api/commit/03c30de5cfed3125d1713458af968b3b49da134c))
- 895031 rename the userLocation and userReceiver schemas ([5b1072a](https://github.com/mohammaDJ23/expense-api/commit/5b1072aa263dcd8ce67e1bb74ce853e0784266fb))
- 895031 rename to create ([639c516](https://github.com/mohammaDJ23/expense-api/commit/639c516f318a633b3c71c189b1c19c13c5fb6d62))
- 895031 revise the GetManyUserConsumerById query and command ([a638c63](https://github.com/mohammaDJ23/expense-api/commit/a638c637364c90ce9fffa4d154a87771df252817))
- 895031 split the codes ([316dd6b](https://github.com/mohammaDJ23/expense-api/commit/316dd6b3b933340bcef771412697d94fee5a10ab))
- 895031 update serializer ([dc160b8](https://github.com/mohammaDJ23/expense-api/commit/dc160b89b360afa31291b40edc58054dd47c3576))
- 895031 update the logic of getCurrentUTCTimestamp ([3a559e4](https://github.com/mohammaDJ23/expense-api/commit/3a559e4cc04a1480750ca0ee930857f7261c0bf6))
- 895031 update the two query names, getUserByEmailOrNull and getUserByIdOrNull ([cfcaa9e](https://github.com/mohammaDJ23/expense-api/commit/cfcaa9eed203ad8b2d5ac43ac74962d64e42f942))
- 895031 use await properly ([6d929dd](https://github.com/mohammaDJ23/expense-api/commit/6d929dd6fb8019973bac533c83c86cbb121f3dc8))
- 895031 use getCurrentUTCTimestamp ([a4ab5a9](https://github.com/mohammaDJ23/expense-api/commit/a4ab5a96c541821809ad2e5135f9c16352636428))
- 895031 use Omit instead of Pick ([d77e586](https://github.com/mohammaDJ23/expense-api/commit/d77e5867924e1ac32182951c38ed1472bc28935b))
- 895031 use Omit instead of Pick ([4f837c1](https://github.com/mohammaDJ23/expense-api/commit/4f837c1e9937a97748562f4f489b1efeb77913e5))
- 895031 use restrict for deleting ([22de7f6](https://github.com/mohammaDJ23/expense-api/commit/22de7f6275e51017f5d937de3891a7ff26916341))
- 895031 use TselectUser ([2951585](https://github.com/mohammaDJ23/expense-api/commit/295158500a5a2a425e68cb2022daf0536d9f72c7))
- 970655 override some packages ([df25f6d](https://github.com/mohammaDJ23/expense-api/commit/df25f6d2811ebac6198c888aaf4f0b06b67d8912))
- 970655 remove the type ([0eb0c8e](https://github.com/mohammaDJ23/expense-api/commit/0eb0c8efe87f300c1ab4ef18e83ec3b0cdbc8714))
- 970655 remove the unused cqrs module ([95de6fe](https://github.com/mohammaDJ23/expense-api/commit/95de6fe4d428c050d49db6c4365930d39fee5025))
- 970655 update the version of multer ([798f98d](https://github.com/mohammaDJ23/expense-api/commit/798f98dcd57a828498a36c790b76388997ae6cb6))

## [1.4.0](https://github.com/mohammaDJ23/expense-api/compare/v1.3.1...v1.4.0) (2026-06-11)

### ✨ Features

- 049999 add location schema and relations ([7fa3252](https://github.com/mohammaDJ23/expense-api/commit/7fa3252bf51828e003eeb8240d9dcbd328e89988))
- 049999 add the bill schema ([468f9ab](https://github.com/mohammaDJ23/expense-api/commit/468f9ab85f2b0da2c7e10589f8271310b7d159b4))
- 049999 add the bills and users relations ([7e55d91](https://github.com/mohammaDJ23/expense-api/commit/7e55d9169ecc4e1ad58a67db90a609a358d7b237))
- 049999 add the consumers schema ([a61b808](https://github.com/mohammaDJ23/expense-api/commit/a61b8088dbfa3f1416ca79a4a7c8a32a15c632e4))
- 049999 add the receiver schema and relations ([95eef88](https://github.com/mohammaDJ23/expense-api/commit/95eef883f78f4e5459cfa0921516c05b31970436))
- 049999 add the usersConsumers shema and the related relations ([c93e379](https://github.com/mohammaDJ23/expense-api/commit/c93e3794b3dce35397e845bd5eb80246a8d543c3))
- 335464 add the delete all not verified users api ([3f8f99f](https://github.com/mohammaDJ23/expense-api/commit/3f8f99f38934f9728ecc500cafc42223cd5d3507))

### 🐛 Bug Fixes

- 049999 use the uqniue constraint inside pgTable ([90ad66b](https://github.com/mohammaDJ23/expense-api/commit/90ad66ba8dc19c07b588f704571a5b629e7da225))
- 692263 delete the cached token ([2a5368d](https://github.com/mohammaDJ23/expense-api/commit/2a5368d99645422e690a98fa4a9865dc39cf3f31))
- 692263 resolve the issue of a high vulnerability ([895032f](https://github.com/mohammaDJ23/expense-api/commit/895032f9df04709463ecf49052f89c20315d67da))

### 🔧 Chores

- 049999 rename schema to schemas ([e7bd759](https://github.com/mohammaDJ23/expense-api/commit/e7bd7598d353451c11cf7a3d7b3e7a4a34e62a7c))
- 335464 add the schedual package ([5d5a1d5](https://github.com/mohammaDJ23/expense-api/commit/5d5a1d56d456eb5e81db821fa72230aae691a405))
- 335464 reorgenize some services from infra to the core services ([63da7ce](https://github.com/mohammaDJ23/expense-api/commit/63da7ce851435ec77528aae07f1803b3ab5f139c))
- 692263 add the current user file ([aeeb420](https://github.com/mohammaDJ23/expense-api/commit/aeeb420f30eada59b3c04b5f358b5b43adfe3dfc))
- 692263 add the global filter ([795a206](https://github.com/mohammaDJ23/expense-api/commit/795a2063ce9d0bf7db21884b80a2a79c5acacb59))
- 692263 add the google files ([2509a81](https://github.com/mohammaDJ23/expense-api/commit/2509a81e53286151b0f981d2648d842007958334))
- 692263 add the http decorator and entitiy inside core ([303adfc](https://github.com/mohammaDJ23/expense-api/commit/303adfce8f541a5db5567024f933a939c5b4856b))
- 692263 add the serializer file ([bc508dd](https://github.com/mohammaDJ23/expense-api/commit/bc508dd5f9dc3af84fa6b6a4abe5bbc7e454ad1b))
- 692263 move all authentication guards into authentication ([c3e833e](https://github.com/mohammaDJ23/expense-api/commit/c3e833eaee5822765234026ab228e4c667e7ff36))
- 692263 reorgenize the modules ([9395b26](https://github.com/mohammaDJ23/expense-api/commit/9395b26d0a42cb0ae8fa747d4384bfde9b24458b))
- 692263 use constants better ([b012544](https://github.com/mohammaDJ23/expense-api/commit/b0125448aafb943fd993ebccc127314bbabf4760))
- 692263 use constants better ([0eac412](https://github.com/mohammaDJ23/expense-api/commit/0eac412f02aed4e863e609350b9c76ebe0f790a8))
- 692263 use constants instead of constant ([26cb10d](https://github.com/mohammaDJ23/expense-api/commit/26cb10d63aa88b7e19be1dc06f8b3ae671e44ea9))
- 692263 use filtersModule ([fc119bc](https://github.com/mohammaDJ23/expense-api/commit/fc119bce50c588cd29ec57836f17ab5422ce1f98))
- 692263 use the base image ([1a0a1d6](https://github.com/mohammaDJ23/expense-api/commit/1a0a1d6e3715820c0c86b66a9a745abe05f7ac9b))
- 785298 add the cqrs module ([0afdc7f](https://github.com/mohammaDJ23/expense-api/commit/0afdc7ff86379db90d92ba7cb7b96b6b32ecc957))
- 785298 add the cqrs module ([ac0d75e](https://github.com/mohammaDJ23/expense-api/commit/ac0d75e14f426cbc5c78110991a5d2ae987a988a))
- 785298 add the related packages ([adcf38c](https://github.com/mohammaDJ23/expense-api/commit/adcf38cfd37aaffa4c84a71515ccb03fc7919193))
- 785298 make drizzle compatible with transaction database ([3f664ee](https://github.com/mohammaDJ23/expense-api/commit/3f664eee21288ad4d4d33f6073f9730fc8b64d08))
- 785298 remove the unused transaction ([560fc74](https://github.com/mohammaDJ23/expense-api/commit/560fc74d3bf061acb1e120aa837c74f13138780c))
- 785298 use the cqrs module ([6e71c7a](https://github.com/mohammaDJ23/expense-api/commit/6e71c7ad959b7258e41b1abed55fc3f4509637de))
- 785298 use the cqrs module ([a5c747e](https://github.com/mohammaDJ23/expense-api/commit/a5c747e9572401dabcde4a73baf3570d11d54d84))
- 785298 use the cqrs module ([4d50f2b](https://github.com/mohammaDJ23/expense-api/commit/4d50f2b2bead1906798c4df1cdff9611d79bffff))
- 785298 use the cqrs module and drizzle repository ([92b40f1](https://github.com/mohammaDJ23/expense-api/commit/92b40f127d3d53e299cdc5f8c4d5a315016ae0b5))
- 785298 use Transactional ([a752f7e](https://github.com/mohammaDJ23/expense-api/commit/a752f7e50d57218565d3e8779788ab598e99e638))
- 803920 add the exception normalizer ([e421628](https://github.com/mohammaDJ23/expense-api/commit/e42162828423e188952bf779055d1d3594bc38cc))
- 803920 do not use the app exception ([bf93ece](https://github.com/mohammaDJ23/expense-api/commit/bf93ece53cce04ff16152ff93a05db59c6dadf2c))
- 836568 optimize the schemas ([0d0c3c4](https://github.com/mohammaDJ23/expense-api/commit/0d0c3c41373c37bd23016fec9b042a40d0ee515c))
- 875092 remove the google service ([a84ef6a](https://github.com/mohammaDJ23/expense-api/commit/a84ef6a56cadd00d0d6a92d27beb33f0058046dd))
- 875092 rename the exception ([7e8a285](https://github.com/mohammaDJ23/expense-api/commit/7e8a285e625357ca1b7a87e38363ea4bc51a38c3))
- 875092 reorgenize the authentication services ([dc3e45d](https://github.com/mohammaDJ23/expense-api/commit/dc3e45dc403d8778c3c21c2a19f3ca050af01ef8))

## [1.3.1](https://github.com/mohammaDJ23/expense-api/compare/v1.3.0...v1.3.1) (2026-06-08)

### 🔧 Chores

- 875092 remove the user data from the signup api ([5bf02af](https://github.com/mohammaDJ23/expense-api/commit/5bf02af4521810ef322702e917720f882a5d2f02))

## [1.3.0](https://github.com/mohammaDJ23/expense-api/compare/v1.2.0...v1.3.0) (2026-06-08)

### ✨ Features

- 875092 add the google apis and service ([88b953a](https://github.com/mohammaDJ23/expense-api/commit/88b953a9d0ffacff7c80a563389819fb7947fd8c))
- 875092 add the google strategy ([0ae8953](https://github.com/mohammaDJ23/expense-api/commit/0ae8953bee2f1ad40e9951e1199695c798f57804))

### 🐛 Bug Fixes

- 875092 store the token ([85ec2ca](https://github.com/mohammaDJ23/expense-api/commit/85ec2caaeff39212d682434e3ed4e534b4f06188))

### 🔧 Chores

- 875092 add and use the user abstract ([15d3b8b](https://github.com/mohammaDJ23/expense-api/commit/15d3b8b5f7530aa34d792ddf924123b113ae5779))
- 875092 add IHealthEntity ([dd24c51](https://github.com/mohammaDJ23/expense-api/commit/dd24c510f184c32e2a3683280352adb84ad85107))
- 875092 add IUserEntity ([a6141c7](https://github.com/mohammaDJ23/expense-api/commit/a6141c7d59f422a8877ff95ef91edbe895a453e5))
- 875092 add more properties ([f4b1c54](https://github.com/mohammaDJ23/expense-api/commit/f4b1c547b62d69e841f2669414d4419cb4b37891))
- 875092 add the current user ([96960e8](https://github.com/mohammaDJ23/expense-api/commit/96960e815e383f705dcc9d18dc4b8091e25ec2d9))
- 875092 add the explicit exceptions ([701c8b5](https://github.com/mohammaDJ23/expense-api/commit/701c8b5835ed46a31502256ce50470f7d2cac7f5))
- 875092 add the explicit exceptions ([d50c26c](https://github.com/mohammaDJ23/expense-api/commit/d50c26c93110277f9a393d6fe1dd2469e8563a64))
- 875092 add the google account related propeties ([e37c1d7](https://github.com/mohammaDJ23/expense-api/commit/e37c1d7844efc8a7d033e78c0a07a8b4fe88b373))
- 875092 add the google guard and strategy which is not completed ([6249088](https://github.com/mohammaDJ23/expense-api/commit/62490889c13375675094361088710b0f799a25c6))
- 875092 add the google oauth envs ([a9a6b0f](https://github.com/mohammaDJ23/expense-api/commit/a9a6b0fe6137ae03ed06872e316f9efe5a976e0a))
- 875092 add the google service ([9930dcb](https://github.com/mohammaDJ23/expense-api/commit/9930dcbf733df64f76a18abbed814d0bb26127fd))
- 875092 add the guard for the local users for authentication apis except signup ([26b3611](https://github.com/mohammaDJ23/expense-api/commit/26b361118a3b8b25407817c37f4231cace0f4f42))
- 875092 add the Throttle ([d8b64ea](https://github.com/mohammaDJ23/expense-api/commit/d8b64ea53e1a40e65333718219307acc59bb4f39))
- 875092 add the verified user condition ([39c36ed](https://github.com/mohammaDJ23/expense-api/commit/39c36ed8433665ab66d0fdf3f9a85c060bac77b5))
- 875092 add the verifiedAt condition to the google auth ([af6d02a](https://github.com/mohammaDJ23/expense-api/commit/af6d02a5f6030555ee3f44c2b13ef8ec7abe7ebd))
- 875092 add TSelectUser ([787fe25](https://github.com/mohammaDJ23/expense-api/commit/787fe25b1a66020f415b3af69ff42502d124d3a7))
- 875092 add TSelectUser ([c4c6dd9](https://github.com/mohammaDJ23/expense-api/commit/c4c6dd9c0c680a7ab510e10be6ae9eadeb192bc6))
- 875092 apply the lintter format ([183935b](https://github.com/mohammaDJ23/expense-api/commit/183935bcad2151f3904d86bd5a4afe8e262788fb))
- 875092 conver to object type ([1a2ff2f](https://github.com/mohammaDJ23/expense-api/commit/1a2ff2fab81e8d4d40eab84d851328b85c26c76a))
- 875092 define the variable inside trycatch ([0c5316f](https://github.com/mohammaDJ23/expense-api/commit/0c5316f4ca58b888a84e5291e0a4147c0666ff03))
- 875092 remove the authentication service ([20bad71](https://github.com/mohammaDJ23/expense-api/commit/20bad710391d7f0aa285ff89d71796d5acccf5a5))
- 875092 rename jwtGuard and jwtStrategy ([0b434f2](https://github.com/mohammaDJ23/expense-api/commit/0b434f299a99d2cd0f3fe6670b2eff6a93c1489b))
- 875092 rename the exceptions ([0e353c8](https://github.com/mohammaDJ23/expense-api/commit/0e353c812e1c7e042ec3ed36cc0d7ab6fb3500e0))
- 875092 rename the google apis ([a6336ea](https://github.com/mohammaDJ23/expense-api/commit/a6336ea921d46904ae9a9302ba46adcc3d8b1758))
- 875092 use CreateUserCommand ([be0d785](https://github.com/mohammaDJ23/expense-api/commit/be0d7858043309999463d297431c7290db53446c))
- 875092 use LocalAuthProviderForbiddenException ([4648c22](https://github.com/mohammaDJ23/expense-api/commit/4648c22b366dbab05f684a6fa212e384eb3f5478))
- 875092 use only TSelectUser and add the properties based on the commands ([56b8a46](https://github.com/mohammaDJ23/expense-api/commit/56b8a46ac4599271c8a72adb0e7888fc9f87509c))
- 875092 use ProcessFailedForbiddenException ([68ec4c5](https://github.com/mohammaDJ23/expense-api/commit/68ec4c536d27e09455a7995a9c713468568433b8))
- 875092 use UserCommand ([4da0658](https://github.com/mohammaDJ23/expense-api/commit/4da065837e7c9d02b5944a010d2b3474fc7f27e4))

## [1.2.0](https://github.com/mohammaDJ23/expense-api/compare/v1.1.2...v1.2.0) (2026-06-06)

### ✨ Features

- 875092 add getUserByEmailOrThrowQuery ([8888008](https://github.com/mohammaDJ23/expense-api/commit/888800890f66a39cbf09543d1cbe7e944dc8f05d))
- 875092 add getUserByEmailQuery ([485a951](https://github.com/mohammaDJ23/expense-api/commit/485a951853bf08d2389f8a3a331f60f36a389ea6))
- 875092 add PasswordHasherService ([0b7bc5b](https://github.com/mohammaDJ23/expense-api/commit/0b7bc5b796beade69b8fc3867ef99930b2e1b563))
- 875092 add the authentication module and signup entitiy ([4920593](https://github.com/mohammaDJ23/expense-api/commit/4920593b18b0b69d1b2d3f5ad5ef7560f2299388))
- 875092 add the controller and service of authentication for signup and call the create user command ([0617aac](https://github.com/mohammaDJ23/expense-api/commit/0617aac4a1311d4b1db17e235f1ef7e973f5389b))
- 875092 add the create user command ([36e0670](https://github.com/mohammaDJ23/expense-api/commit/36e067064dbf170720757056ed448d9765187efe))
- 875092 add the create user command and repository ([395fc39](https://github.com/mohammaDJ23/expense-api/commit/395fc390ff88b890a2461ff4835930f08bfa776c))
- 875092 add the entities of the user ([4bb1cdd](https://github.com/mohammaDJ23/expense-api/commit/4bb1cdd19bbb1be8f2dba7bf265ee52d8c742e46))
- 875092 add the extensions of queryBuilder ([b6c0485](https://github.com/mohammaDJ23/expense-api/commit/b6c0485fec2b971f7bedfdc348ba774428afbe33))
- 875092 add the forgot password api ([cc7ae20](https://github.com/mohammaDJ23/expense-api/commit/cc7ae20de08b033401dbf5a59eb3985b1e6ec4ef))
- 875092 add the getUserByEmail query ([0133b50](https://github.com/mohammaDJ23/expense-api/commit/0133b5010696f8ffebd7267647199a3f540c7e51))
- 875092 add the getUserById query ([8c30de3](https://github.com/mohammaDJ23/expense-api/commit/8c30de39d8635f6b295be6e6a2112cdb4671f929))
- 875092 add the isUserExistsByEmail query ([9e3a95e](https://github.com/mohammaDJ23/expense-api/commit/9e3a95eaedc5fdd9b9d9d3063ca1f7304e2eadc8))
- 875092 add the jwt guard and strategy ([d5b8641](https://github.com/mohammaDJ23/expense-api/commit/d5b86413cd19a342212f01694508c8cf71600415))
- 875092 add the login process ([30cbf7b](https://github.com/mohammaDJ23/expense-api/commit/30cbf7b7f3393e1bdf962bf82892369b3be4803b))
- 875092 add the path of signup ([06d01cf](https://github.com/mohammaDJ23/expense-api/commit/06d01cf5e63ce9b8c1dda888a6d24ee4117f70f4))
- 875092 add the reset password api ([eb3bf7a](https://github.com/mohammaDJ23/expense-api/commit/eb3bf7abd8784a6c5b9451f51ca4a704ffa1ee6e))
- 875092 add the sending email verification token route and the related services ([5fd292d](https://github.com/mohammaDJ23/expense-api/commit/5fd292d4ef5876073cd2116f37a40e1a9ba70b61))
- 875092 add the signup commands ([9a58b09](https://github.com/mohammaDJ23/expense-api/commit/9a58b0963b2163fa5f2890d6a07979ac51607cf5))
- 875092 add the update user logic ([96e8167](https://github.com/mohammaDJ23/expense-api/commit/96e816785e0b5a954c2c1c38ea409c0f0e9d5f05))
- 875092 add the user entity to the user module and add the user module to the app module ([285fcc8](https://github.com/mohammaDJ23/expense-api/commit/285fcc8c20465edbd12d66d98fa36a00bf0bff85))
- 875092 add the user orm entity and repository ([c02d35b](https://github.com/mohammaDJ23/expense-api/commit/c02d35b83bce5133bf53398cbc2f611d30bf796c))
- 875092 add the user repository interface ([584b30c](https://github.com/mohammaDJ23/expense-api/commit/584b30cf14b382baa532e5fd22cc52e92bef7e91))
- 875092 add the verifying email verification token logic ([799985a](https://github.com/mohammaDJ23/expense-api/commit/799985a1ca9b399988fd8349b06e4a631429c0f1))
- 875092 check if the user exists by email ([deb7466](https://github.com/mohammaDJ23/expense-api/commit/deb746602f25aedbf779bdf0469e7ba1918f6101))
- 875092 get a user by email ([df9d9c9](https://github.com/mohammaDJ23/expense-api/commit/df9d9c962675a43bf059be64e469bfbd53fe75aa))
- 875092 replace typeorm with drizzle ([de66373](https://github.com/mohammaDJ23/expense-api/commit/de66373c2c82d448f696e38e9ff10759bb6c3e45))

### 🐛 Bug Fixes

- 875092 add a type to the jwt token ([2cddb4f](https://github.com/mohammaDJ23/expense-api/commit/2cddb4ff74b390d3870b07f0fb89f6ee40241bde))
- 875092 add fast-uri as the overrides ([9c7d12f](https://github.com/mohammaDJ23/expense-api/commit/9c7d12fa7f6007166c5fd808d5afbdf7c96f1316))
- 875092 add the curl with the new version to the vex file ([4fe59c7](https://github.com/mohammaDJ23/expense-api/commit/4fe59c7595228d2964e3a327ed9b0162c89d1988))
- 875092 add the missed where clause ([d00ec06](https://github.com/mohammaDJ23/expense-api/commit/d00ec06244374831dd2ecaeb10e14a0fc6d81789))
- 875092 change the name ([369979b](https://github.com/mohammaDJ23/expense-api/commit/369979b43e2a589727a1f3abc87e5382c5bf2355))
- 875092 do not expose the not found user error in the forgot password service ([41b1c62](https://github.com/mohammaDJ23/expense-api/commit/41b1c62a2a3a2b630178bcf33030b1745149fefc))
- 875092 do not expose the not found user error in the login service ([0dd9ff7](https://github.com/mohammaDJ23/expense-api/commit/0dd9ff7fd5deee533d46bd67dd5e2816ed74b765))
- 875092 do not expose the not found user error in the sending verification service ([32d14b3](https://github.com/mohammaDJ23/expense-api/commit/32d14b330bf1e9918c69991e1d72e2d4b7a9b6b8))
- 875092 do not expose the not found user error in the verifing verification service ([868f7a4](https://github.com/mohammaDJ23/expense-api/commit/868f7a4486eb8aa745e5cd1028ab390c2cf8ed60))
- 875092 import LoginRequestDto as a type ([c1da35b](https://github.com/mohammaDJ23/expense-api/commit/c1da35b7123994d8739ff7ecc896c39191b058b1))
- 875092 import the actual QueryBus not as a type ([89590b1](https://github.com/mohammaDJ23/expense-api/commit/89590b1216fb7d7bcb472722314adf0947bd756b))
- 875092 override the axios ([f772071](https://github.com/mohammaDJ23/expense-api/commit/f772071ad067042703c83f1193354724ef1c4230))
- 875092 read secret ([4ba87d0](https://github.com/mohammaDJ23/expense-api/commit/4ba87d0628411c37a4ea0325d74b9daa89e73e5a))
- 875092 remove the extra type ([26d80ab](https://github.com/mohammaDJ23/expense-api/commit/26d80ab48082b5de01305ce75b83d46efe112b20))
- 875092 remove the type from Reflector ([b3fb8da](https://github.com/mohammaDJ23/expense-api/commit/b3fb8da5289bcecd7697a3d6a212151e6ab5ce99))
- 875092 remove the type from UserOrmEntity and use InejctRepository ([ef79f15](https://github.com/mohammaDJ23/expense-api/commit/ef79f1510f5d36b702afb8f5206ac18a77b73bb9))
- 875092 remove toEntity ([ea7e43e](https://github.com/mohammaDJ23/expense-api/commit/ea7e43e20cdebd2cc1924eb9bf900e7853718a70))
- 875092 reuse user ([90404e9](https://github.com/mohammaDJ23/expense-api/commit/90404e999bd538811b0c7d3dcacee81aeb339d59))
- 875092 seach for just status ok since the response may has a message ok text ([c28e4ce](https://github.com/mohammaDJ23/expense-api/commit/c28e4cea081d73a5f52d246e792f9c39cfec4f25))
- 875092 seach for just status ok since the response may has a message ok text ([f03ba94](https://github.com/mohammaDJ23/expense-api/commit/f03ba94d982d9875bdbeb5056c038b7f1ea9a0d9))
- 875092 separete the type of object exception ([7921345](https://github.com/mohammaDJ23/expense-api/commit/792134534baccd1ad0e07f11aa8b80081c399019))
- 875092 uncomment the throttle ([85ef92b](https://github.com/mohammaDJ23/expense-api/commit/85ef92b4a40293fc91d630b038a55c0c712e67ac))
- 875092 update axios ([192c3c8](https://github.com/mohammaDJ23/expense-api/commit/192c3c8e189048ca63409540c75460e91b6906b6))
- 875092 update the error message ([f892a65](https://github.com/mohammaDJ23/expense-api/commit/f892a6536848c393c1fbf78858e9fee41a6c8475))
- 875092 update the path of AppException ([b398c80](https://github.com/mohammaDJ23/expense-api/commit/b398c804f2bab0cabfb972aec4866bcbe88dd13d))
- 875092 update the path of AppException ([2007924](https://github.com/mohammaDJ23/expense-api/commit/20079247a454a3fdabcfe8f2b43ef2212f4aecd3))
- 875092 use --force ([b5db05e](https://github.com/mohammaDJ23/expense-api/commit/b5db05e4bd93996429fc9f7400ae6cc3b81239c0))
- 875092 use 4000 port ([bc909e4](https://github.com/mohammaDJ23/expense-api/commit/bc909e44a1df6cdf3dc762452af8be930008e106))
- 875092 use actual SignupDto not as a type ([80e4299](https://github.com/mohammaDJ23/expense-api/commit/80e42995d4e85b9450fe3e2ec2db8b0ee70fc4dc))
- 875092 use the url instead of the properties ([f22bc5e](https://github.com/mohammaDJ23/expense-api/commit/f22bc5e2d68e2128715320370829c00aae7fe6c5))
- 875092 use try catch ([ad10cf2](https://github.com/mohammaDJ23/expense-api/commit/ad10cf226ed1fead819d48a6116bb0c8bc458718))
- 875092 use try catch ([f748c11](https://github.com/mohammaDJ23/expense-api/commit/f748c1158d56433f6b5efbe0fb93f872549c7a60))
- 875092 use underscore to ignore the error ([eb24fbb](https://github.com/mohammaDJ23/expense-api/commit/eb24fbbb4bd7044c6cd2933719c7552c54765ec2))

### 🔧 Improvements

- 875092 combine message and statuscode of a response to the Response decorator ([6f851ba](https://github.com/mohammaDJ23/expense-api/commit/6f851ba7325f6598b2158f2d03f6d15138e5b02d))

### 🔧 Configurations

- 875092 add drizzle-orm ([d95b97e](https://github.com/mohammaDJ23/expense-api/commit/d95b97e4b1c164d073873c66509425506444cc2b))
- 875092 add the pnpm installation options ([1caaedd](https://github.com/mohammaDJ23/expense-api/commit/1caaeddcad1de11ffee8e4c34165171b7bb62523))
- 875092 remove typeorm and @nestjs/typeorm ([74c8bf9](https://github.com/mohammaDJ23/expense-api/commit/74c8bf9e6ea90477224d3482f71f634d915377ff))

### 🔧 Continuous Integration

- 875092 add the new secrets ([92de753](https://github.com/mohammaDJ23/expense-api/commit/92de75307a0848a48997d9c95ef8c43dca8e8775))

### 🔧 Chores

- 875092 add @humanwhocodes/env and setup the drizzle configuration ([08a7aa3](https://github.com/mohammaDJ23/expense-api/commit/08a7aa3ca1127ed33c04d5509f71a7c469b05004))
- 875092 add @types/pg ([682b7cf](https://github.com/mohammaDJ23/expense-api/commit/682b7cffe1b828bddfe5362b024d9127e6bb1dd6))
- 875092 add argon2 ([93b4dd4](https://github.com/mohammaDJ23/expense-api/commit/93b4dd46f460758e0a25d1ef466b6692b830cc01))
- 875092 add class-transformer ([312bd95](https://github.com/mohammaDJ23/expense-api/commit/312bd953e1914e891032a88fbe184533777987ff))
- 875092 add CQRSModule ([cd8a346](https://github.com/mohammaDJ23/expense-api/commit/cd8a3462ef285a69e7c8d8096ae8e2b5b91a42fc))
- 875092 add data to the exceptions ([4b08244](https://github.com/mohammaDJ23/expense-api/commit/4b0824476bedf3007444f29b70760af27925856e))
- 875092 add SignupDto ([5bbdd6a](https://github.com/mohammaDJ23/expense-api/commit/5bbdd6ac3f36f73d3f21d116f23391bcf679c8b4))
- 875092 add some envs related to mail ([938ee05](https://github.com/mohammaDJ23/expense-api/commit/938ee0546a0b15a3956c687c5ccac8ba0778b3fa))
- 875092 add some logs to see the failed services ([58c86eb](https://github.com/mohammaDJ23/expense-api/commit/58c86ebc31bf829d11f2b1421d6eff565b2ebff8))
- 875092 add SUCCESS_HEALTH_MESSAGE ([d402b06](https://github.com/mohammaDJ23/expense-api/commit/d402b0628905eb53567ca2fff6324a73c8e6a3d1))
- 875092 add the autoLoadEntities option ([ab51862](https://github.com/mohammaDJ23/expense-api/commit/ab518624abb19ef6842cd6c02221721ccab50b0d))
- 875092 add the core module ([2eee989](https://github.com/mohammaDJ23/expense-api/commit/2eee989a555471e28d1fef7727bb822b2d780923))
- 875092 add the entity of the verification ([7f9e3ed](https://github.com/mohammaDJ23/expense-api/commit/7f9e3edb5d16cf9a5db9a36c299ba7f9b72fbaf4))
- 875092 add the forgot password storage ([714aaa4](https://github.com/mohammaDJ23/expense-api/commit/714aaa47c6038e2afe42ead17209320952cd2a2c))
- 875092 add the global types ([e0ee87e](https://github.com/mohammaDJ23/expense-api/commit/e0ee87eb98ca8d29eab16751229daa32c3b1d245))
- 875092 add the hashedPassword property inside the update user command ([3868976](https://github.com/mohammaDJ23/expense-api/commit/3868976373d8ebde1094002d01196ee50f403636))
- 875092 add the health entity interface ([200a3b9](https://github.com/mohammaDJ23/expense-api/commit/200a3b9a6beef7e49c39e8c4b7d87c8115e7f9b8))
- 875092 add the health entity interface ([52b3775](https://github.com/mohammaDJ23/expense-api/commit/52b377567c3122d7530519ea6b564b6a5f2c242a))
- 875092 add the jwt and mailer module and services ([eda9eab](https://github.com/mohammaDJ23/expense-api/commit/eda9eab1cee5551afcf9693e74167ed37666460b))
- 875092 add the jwt related packages ([26ba6b6](https://github.com/mohammaDJ23/expense-api/commit/26ba6b61db9a23aa45ef5621b8855fa5e7f976bd))
- 875092 add the message to responseEntity ([b563bb2](https://github.com/mohammaDJ23/expense-api/commit/b563bb2e779b875495da50488077328bbe3232ef))
- 875092 add the related nodemailer packages ([a8a4b90](https://github.com/mohammaDJ23/expense-api/commit/a8a4b9067c7f7758126b427ce15ca824fc1d0554))
- 875092 add the response interface and entity ([e15331f](https://github.com/mohammaDJ23/expense-api/commit/e15331f70ccc895b8c66cabe66835a0bd00f7b36))
- 875092 add the return type ([dbca35f](https://github.com/mohammaDJ23/expense-api/commit/dbca35fb305ca976987dfe522ef7fe3308dc8dcc))
- 875092 add the secrets to the docker compose files ([43b58ca](https://github.com/mohammaDJ23/expense-api/commit/43b58ca891c7fed3dcdb95ba363ddd4684e0a746))
- 875092 add the serializer interceptor and decorator ([743013e](https://github.com/mohammaDJ23/expense-api/commit/743013eef827bcdf6192eb471e3bc149cdb1abcd))
- 875092 add the services related to the signup ([8811aaf](https://github.com/mohammaDJ23/expense-api/commit/8811aaf07dff5dec95636686d9d2d57eccb00a95))
- 875092 add the success and error messages ([7f291c8](https://github.com/mohammaDJ23/expense-api/commit/7f291c87cfe5ba95e37edc9ec03e2cc779148821))
- 875092 add the transformResponseInterceptor for transforming any response ([0105954](https://github.com/mohammaDJ23/expense-api/commit/010595436a4b006d83329691c1b5c03f128b74ce))
- 875092 add the type data to the response ([af06315](https://github.com/mohammaDJ23/expense-api/commit/af063153089a6b5b002bb70f58bc3040b933ef28))
- 875092 add the validation pipe with whitelist ([189efda](https://github.com/mohammaDJ23/expense-api/commit/189efda4b7258785da9d75ae670e01f606f2de25))
- 875092 add the verification storage ([b6d68df](https://github.com/mohammaDJ23/expense-api/commit/b6d68df42a591c83779ed7d41a998e18b0a35997))
- 875092 add transform and forbidNonWhitelisted ([5964212](https://github.com/mohammaDJ23/expense-api/commit/596421265fd2e1126f6876600087aec51dfc98dd))
- 875092 add TransformValidatorResponsePipe ([bfa9a87](https://github.com/mohammaDJ23/expense-api/commit/bfa9a8777588313df358b122b9e50284f6da4a6f))
- 875092 add VALIDATION_FAILED_MESSAGE ([c5bc695](https://github.com/mohammaDJ23/expense-api/commit/c5bc6959a247881aacfb76a962d6f07c7f4eb8ee))
- 875092 change some rules ([e7ccac4](https://github.com/mohammaDJ23/expense-api/commit/e7ccac4a29e04ceedae72d455ebdbed3470a25c9))
- 875092 change the error texts ([3f4eb0c](https://github.com/mohammaDJ23/expense-api/commit/3f4eb0c51d007a10ca0d236c1a8dedaa563b307c))
- 875092 change the error texts ([746211f](https://github.com/mohammaDJ23/expense-api/commit/746211f22d6eab80a2189c096c4d16114b921325))
- 875092 change the key name ([26b4e1f](https://github.com/mohammaDJ23/expense-api/commit/26b4e1fdc9c766d133f9c3e730b7efca5e8b8294))
- 875092 change the name ([9469675](https://github.com/mohammaDJ23/expense-api/commit/94696758fe4952c673fffa9b5f0768047ac423a3))
- 875092 change the route of the verification ([f5ba7a4](https://github.com/mohammaDJ23/expense-api/commit/f5ba7a41c813841e95b3be10563671ff8a93c535))
- 875092 change the update process ([e591657](https://github.com/mohammaDJ23/expense-api/commit/e591657ce1542b9f8e94bdad012143eb5651fc6f))
- 875092 change the verification method and link ([88e73b8](https://github.com/mohammaDJ23/expense-api/commit/88e73b899e2565ecf2af32f2e474452a2852d3d1))
- 875092 change to the Signup name ([5200fab](https://github.com/mohammaDJ23/expense-api/commit/5200fab23f55d0523353516869adefca043e6dcf))
- 875092 convert arrow function to the default function for types ([400104a](https://github.com/mohammaDJ23/expense-api/commit/400104a31edc1ec0d57e2dc21514d335aeeef758))
- 875092 convert INTERNAL_SERVER_ERROR to INTERNAL_SERVER_ERROR_MESSAGE ([87c9a44](https://github.com/mohammaDJ23/expense-api/commit/87c9a44fc5ad67384f436edbec630d98c7e79d7c))
- 875092 convert orm to schema ([b2ee589](https://github.com/mohammaDJ23/expense-api/commit/b2ee58975a03b495a90b303af1522bb29797d331))
- 875092 convert rename setApp and getApp to set and get ([2bbdaf4](https://github.com/mohammaDJ23/expense-api/commit/2bbdaf4ec569a87763ece8ab9a03f5dcef91f651))
- 875092 convert rename setApp and getApp to set and get ([a2d2f36](https://github.com/mohammaDJ23/expense-api/commit/a2d2f36231b109ba9b47ddb9caf7db8e6bc2345f))
- 875092 convert rename the interface of the user repository ([7aa5a7f](https://github.com/mohammaDJ23/expense-api/commit/7aa5a7fde14c894caece42041bd5bede6e65f631))
- 875092 disable import-x/no-unassigned-import ([da6b26d](https://github.com/mohammaDJ23/expense-api/commit/da6b26d4bf986c83015a740df986f36e25b31553))
- 875092 do lint:fix ([a031f92](https://github.com/mohammaDJ23/expense-api/commit/a031f920c84eceb89711598862a4948769df841c))
- 875092 do not export userRolesEnum ([2673670](https://github.com/mohammaDJ23/expense-api/commit/26736703aae83a731020617988356878109dd78f))
- 875092 do not ignore the healthcheck path ([fc38f81](https://github.com/mohammaDJ23/expense-api/commit/fc38f8136328a2faa2af0c47e46fe3541517d009))
- 875092 do not use the duplicate error message ([cd903bb](https://github.com/mohammaDJ23/expense-api/commit/cd903bbe8a8d9bc1d104bcbd344156cdc842a4e7))
- 875092 export CQRSModule ([f71ce1c](https://github.com/mohammaDJ23/expense-api/commit/f71ce1c05deaa8b04d5ee15b51a51c169e3124f3))
- 875092 inforce message and statuscode ([8552978](https://github.com/mohammaDJ23/expense-api/commit/8552978cfcd1f315cb759434740a3f82b337055b))
- 875092 log the healthcheck ([3d96318](https://github.com/mohammaDJ23/expense-api/commit/3d9631876a6774678b5bdd6394bf8c9fc3244c79))
- 875092 log userRepository ([88de513](https://github.com/mohammaDJ23/expense-api/commit/88de513d2c225908de64cc62f5598400887f695a))
- 875092 move exceptions to the core folder ([82aa804](https://github.com/mohammaDJ23/expense-api/commit/82aa8041af5e6148a86986b759ac752d96d2cacc))
- 875092 move internal server error to the messages ([d85ae37](https://github.com/mohammaDJ23/expense-api/commit/d85ae37b2b9a7e21456d503fdd70bb5f8a4d438c))
- 875092 move out core and infrastructure from common into src ([e8cd871](https://github.com/mohammaDJ23/expense-api/commit/e8cd871b8cae8f7b3ba6b21ddda8e848d6a32b26))
- 875092 move response to presentation ([9d8e843](https://github.com/mohammaDJ23/expense-api/commit/9d8e84323696518180a30ead196c2540234d5be7))
- 875092 move response to the related file response ([fcb51f1](https://github.com/mohammaDJ23/expense-api/commit/fcb51f18f9f9511a89c60054cfb42df30ff8dde3))
- 875092 move the core folder to the common ([a8bef79](https://github.com/mohammaDJ23/expense-api/commit/a8bef79335b6c8f652e0eccb48e781911d66d288))
- 875092 move the exception interface its doamin ([9c773f7](https://github.com/mohammaDJ23/expense-api/commit/9c773f7794a267ef69f3323a1bb0e2a27ed8b1ca))
- 875092 move the global exception into the filter file ([445c259](https://github.com/mohammaDJ23/expense-api/commit/445c2595adc79e666900c3ed49808596f8d0f09d))
- 875092 move the related interfaces to each doamin ([ffcd0a0](https://github.com/mohammaDJ23/expense-api/commit/ffcd0a0ddd6fd6a5d8c463581a6077a7f2e8d4f4))
- 875092 read synchronize by the node env ([92925e8](https://github.com/mohammaDJ23/expense-api/commit/92925e814f5811ac138253b5bc45c9280bc7ff07))
- 875092 remove data from appException ([0b6220e](https://github.com/mohammaDJ23/expense-api/commit/0b6220ee71a26f38a641999536c60423cd606e7c))
- 875092 remove DATABASE_SYNCHRONIZE ([04a63b3](https://github.com/mohammaDJ23/expense-api/commit/04a63b3b70d032865a17e3a939f116bdf71e2dc3))
- 875092 remove the log ([87776f9](https://github.com/mohammaDJ23/expense-api/commit/87776f9fc08366727b1a7682d940da31e45a91db))
- 875092 remove the logs of the services ([2150817](https://github.com/mohammaDJ23/expense-api/commit/215081798a1379dbc3163a40ca501d3c9b3fdfbf))
- 875092 remove the password hasher service ([ffea02e](https://github.com/mohammaDJ23/expense-api/commit/ffea02ef982e3b28631ef2332ac063672a22eb39))
- 875092 remove the signup entity and interface ([1275d50](https://github.com/mohammaDJ23/expense-api/commit/1275d5094cd54454d5cf539ecb2f79ac3de0da5b))
- 875092 remove the transforming validatorPipe ([92677cd](https://github.com/mohammaDJ23/expense-api/commit/92677cd5e66a7afb5eb76f3d34aca980182833e3))
- 875092 remove the user checking ([77479a7](https://github.com/mohammaDJ23/expense-api/commit/77479a7fd796fd10280b45558367537c01fcbbcb))
- 875092 remove the verifying jwt method ([0e6cad2](https://github.com/mohammaDJ23/expense-api/commit/0e6cad2c5942e3ae9e8528828cd12a1eec453d6b))
- 875092 remove toInsert ([c2f9943](https://github.com/mohammaDJ23/expense-api/commit/c2f99436acd9c0eccebde5f3fd750d5e67a86160))
- 875092 remove verificationPayload.entity.ts ([ebcd702](https://github.com/mohammaDJ23/expense-api/commit/ebcd70233228b4334422a8902804495a51dd8d86))
- 875092 rename app.constants to app.constant ([0fefd79](https://github.com/mohammaDJ23/expense-api/commit/0fefd791b1a92a9e7e286dd62749fc9d6d956942))
- 875092 rename emailVerificationMailer and emailVerificationToken ([58d80cd](https://github.com/mohammaDJ23/expense-api/commit/58d80cd352540fb8478404ba93e9f0ecdd7e5147))
- 875092 rename get health query and remove diract call ([5f82a98](https://github.com/mohammaDJ23/expense-api/commit/5f82a9856e9f632b51f612f7bc50f7e00fb05233))
- 875092 rename passwordHashing to passwordHasher ([aec7d84](https://github.com/mohammaDJ23/expense-api/commit/aec7d849308f1686aff71541007ef92b0a1faf1e))
- 875092 rename presentation to application ([e693e96](https://github.com/mohammaDJ23/expense-api/commit/e693e96df6ace75c7c13472beb5674241c0c72bf))
- 875092 rename ransformResponse to transformResponse ([4e69342](https://github.com/mohammaDJ23/expense-api/commit/4e69342c4f67f9f5c816c86cb2fbb9a40d91bf32))
- 875092 rename response.decorator.ts ([cb6ab8c](https://github.com/mohammaDJ23/expense-api/commit/cb6ab8cc22c2160381b50bbcdf604a88c8fa7909))
- 875092 rename response.decorator.ts ([e67ede2](https://github.com/mohammaDJ23/expense-api/commit/e67ede2088975f1a14300228c1a5f5666f04f7f4))
- 875092 rename the email verifications ([44bee92](https://github.com/mohammaDJ23/expense-api/commit/44bee92eef779db82cdd160d58483dfcfff1070f))
- 875092 rename the types of the user schema ([eb0597c](https://github.com/mohammaDJ23/expense-api/commit/eb0597c1946373f7a816c2307321fe030cb7e6cb))
- 875092 rename transformResponse to ransformResponse ([31679d3](https://github.com/mohammaDJ23/expense-api/commit/31679d308cff885dba9ef6d7debc3901a830f4a5))
- 875092 rename TransformResponseInterceptor to transformResponseInterceptor ([47a42ee](https://github.com/mohammaDJ23/expense-api/commit/47a42ee9dbf8c6a58a954858df3b09c4b7cf1e94))
- 875092 revert the healthcheck path for ignoring ([92fda3b](https://github.com/mohammaDJ23/expense-api/commit/92fda3ba5363eb974ec0c3a6b83fd17dbb507fd8))
- 875092 select all properties ([5fb7e1f](https://github.com/mohammaDJ23/expense-api/commit/5fb7e1fefeb524c4d663b842bd0c670d0f9d7a7a))
- 875092 separete the request dtos ([bf9cf0b](https://github.com/mohammaDJ23/expense-api/commit/bf9cf0b5886580bfe3a06929b8e3c379b52d4f94))
- 875092 simplify the response entity dasta ([694828f](https://github.com/mohammaDJ23/expense-api/commit/694828fbd24de6014e2cd50d911f3e36bd5e71e4))
- 875092 split the request and response dtos ([5ed90a7](https://github.com/mohammaDJ23/expense-api/commit/5ed90a710097c40958d273920d891d33d096efcb))
- 875092 split the services ([d9b0aa5](https://github.com/mohammaDJ23/expense-api/commit/d9b0aa584336a599b869ff8ac502751cba0d9cd3))
- 875092 update pnpm-lock.yaml ([2137d2f](https://github.com/mohammaDJ23/expense-api/commit/2137d2f61573e753a190c695fcb25e99ae2a959b))
- 875092 update the healthcheck command for the log ([973a3c8](https://github.com/mohammaDJ23/expense-api/commit/973a3c86b810c75c1931ad3d9f0998483d493e6a))
- 875092 update the healthcheck command for the log ([196bbb3](https://github.com/mohammaDJ23/expense-api/commit/196bbb3906ed22b5c6905beccfc84c256c42d8bd))
- 875092 update the healthcheck command for the log ([f36b173](https://github.com/mohammaDJ23/expense-api/commit/f36b1731aaf2445029bda8f211c8ed025e8196b0))
- 875092 update the healthcheck to see the log of the response ([92b889f](https://github.com/mohammaDJ23/expense-api/commit/92b889f38421b9024ab052a3e3b9d5d36eadad16))
- 875092 update the method type ([0813f2e](https://github.com/mohammaDJ23/expense-api/commit/0813f2e81f5ebad05b53511ff6deb2988c817c08))
- 875092 update the verification route ([576bb1c](https://github.com/mohammaDJ23/expense-api/commit/576bb1c00f9042f96eb806751da092833ac10ab8))
- 875092 upgrade typeorm ([88b1de4](https://github.com/mohammaDJ23/expense-api/commit/88b1de4924f5989ee2a6b713e3fe6aac1d26b438))
- 875092 use a plain object ([dbb2063](https://github.com/mohammaDJ23/expense-api/commit/dbb2063c806517a93ecaa0a13532666118d853a9))
- 875092 use constants and exceptions correctly ([0923047](https://github.com/mohammaDJ23/expense-api/commit/0923047d786fec3283c2069f4bc6bcb80fc94ef7))
- 875092 use CreateUserHandler as providers ([6db34b0](https://github.com/mohammaDJ23/expense-api/commit/6db34b0b060558c2803e97f8966cd0edb3336a9e))
- 875092 use getOrThrow for envs ([6ed4000](https://github.com/mohammaDJ23/expense-api/commit/6ed4000b4d537df48af3702fe22429cf34c77adb))
- 875092 use initial value of updatedAt ([a7ae783](https://github.com/mohammaDJ23/expense-api/commit/a7ae783f625ff5216c8baa84e574bea9ba8fae37))
- 875092 use just UserEntity ([1ebfd58](https://github.com/mohammaDJ23/expense-api/commit/1ebfd58ac2e1c1c4eb6f123e34b8fe8c16a69cff))
- 875092 use NotfoundException ([9442b6c](https://github.com/mohammaDJ23/expense-api/commit/9442b6c17ef0b39959367508fc61bfdf9c96fdd6))
- 875092 use readonly for the entities ([d319808](https://github.com/mohammaDJ23/expense-api/commit/d319808d64bce44d8c97c03ad68044f4eef478a7))
- 875092 use ResponseMessage, ResponseStatusCode and HttpCode for the health controller ([2e040be](https://github.com/mohammaDJ23/expense-api/commit/2e040be43288fbb77d81e6578c270db4b4519ede))
- 875092 use signup dto locally ([5674019](https://github.com/mohammaDJ23/expense-api/commit/5674019a721c3d6bdde8d26b45736045267ca900))
- 875092 use the default healthcheck ([6faf6d6](https://github.com/mohammaDJ23/expense-api/commit/6faf6d607eb4a24beed7c02c17cd77aa48f274ed))
- 875092 use the object serializer and new dtos ([f0d1dba](https://github.com/mohammaDJ23/expense-api/commit/f0d1dba92ec2959af085bd74307d249e451604c6))
- 875092 use the response entity in the exception ([26fff55](https://github.com/mohammaDJ23/expense-api/commit/26fff559e6a5580aa21c4af61f92741f14d3f870))
- 875092 use the TRequiredInsertUser type and ignore id when a new user wants to create ([6adad9d](https://github.com/mohammaDJ23/expense-api/commit/6adad9d0bf84c42d1464847798e39b4c43332aee))
- 875092 use toEntityOrThrow for the user creation ([6466fd9](https://github.com/mohammaDJ23/expense-api/commit/6466fd9ff6a4df785694b91c05f802ef3797b8ed))
- 875092 use try cache for any step that may could fail ([8fd7040](https://github.com/mohammaDJ23/expense-api/commit/8fd7040e34dac906042b1797699ac193012dbbd7))

## [1.1.2](https://github.com/mohammaDJ23/expense-api/compare/v1.1.1...v1.1.2) (2026-05-02)

### 🐛 Bug Fixes

- 123281 remove && sign after the command ([a9ff839](https://github.com/mohammaDJ23/expense-api/commit/a9ff83927b532b48e0a43519ccedfdb683c904dc))
- 123281 upgrade aquasecurity/trivy-action to v0.36.0 ([e54147a](https://github.com/mohammaDJ23/expense-api/commit/e54147a2d49bb28f7804c49ab0878760c5877544))
- 123281 use the docker compose production for ci mode ([13d2b3b](https://github.com/mohammaDJ23/expense-api/commit/13d2b3b01343d9e7f1846a3c6e223c6b7bc58661))
- 473121 update the message of throttler ([8a250bf](https://github.com/mohammaDJ23/expense-api/commit/8a250bf69aca90a7e355ab9d42c0b9da6c4760c7))
- 473121 upgrade aquasecurity/trivy-action to 0.36.0 ([63e4ec5](https://github.com/mohammaDJ23/expense-api/commit/63e4ec5ab606e4c1222ba7a03706af9812402ed4))

### ♻️ Code Refactoring

- 346926 fix the typeo names ([30b6e98](https://github.com/mohammaDJ23/expense-api/commit/30b6e9855f7039df0773349a5d09042e9d769b72))
- 346926 move the constatns to the related service and use them inside the modules ([452ecb7](https://github.com/mohammaDJ23/expense-api/commit/452ecb7bd48ce5979eaeb042a9f6d6fdc565c30d))
- 473121 add the strategies of the exceptions ([9236072](https://github.com/mohammaDJ23/expense-api/commit/9236072f1a1610bfafbeb714b5ec076d923f9d2f))

### 🔧 Configurations

- 473121 update the swagger configuration ([02d8e59](https://github.com/mohammaDJ23/expense-api/commit/02d8e593863e2ff2d91883184d78fac86b3f551d))

### 🔧 Chores

- 123281 add a healthcheck to elasticsearch ([3e5ab66](https://github.com/mohammaDJ23/expense-api/commit/3e5ab66cced4210ae4229a20be279673b029e548))
- 123281 add HOST_UID ([9ead89c](https://github.com/mohammaDJ23/expense-api/commit/9ead89c741ae5ad489f36ca3947cbbf0c59897ee))
- 123281 add HOST_UID ([f1af47a](https://github.com/mohammaDJ23/expense-api/commit/f1af47a87d7a1a1431c2bc0466f0637e1c889b8c))
- 123281 add init-filebeat-keystore service and a healthcheck for the filebeat service ([0b1bd20](https://github.com/mohammaDJ23/expense-api/commit/0b1bd2095c271effe650a80b044152328b1c890b))
- 123281 add some commands for debugging ([f90a2a9](https://github.com/mohammaDJ23/expense-api/commit/f90a2a9e6725aa0e96e2f1b1342c723ce6ab3e06))
- 123281 add some logs to see the failed containers ([d3709a3](https://github.com/mohammaDJ23/expense-api/commit/d3709a3e3b0bae6fc0dbb3a6a75c9a2feba912c9))
- 123281 add the init-elasticsearch-secrets service ([f284540](https://github.com/mohammaDJ23/expense-api/commit/f284540b6ece5b58cd62619ace95371471e67ba9))
- 123281 add the init-filebeat-config service ([4b8e979](https://github.com/mohammaDJ23/expense-api/commit/4b8e9791e2d033df8e3aab557db9917c5f9e319c))
- 123281 add the only-vex-affected option ([4a2c510](https://github.com/mohammaDJ23/expense-api/commit/4a2c5106e958f2956c9e5a895f4134e496d5c044))
- 123281 add the scout file to ignore the curl package ([069ef31](https://github.com/mohammaDJ23/expense-api/commit/069ef31078a7594c81f343f4dbf0425282cf44c1))
- 123281 add TINI_SUBREAPER ([483f231](https://github.com/mohammaDJ23/expense-api/commit/483f231272572180d87cb1a9801ac3cd30627b75))
- 123281 add TINI_SUBREAPER ([ac2ccff](https://github.com/mohammaDJ23/expense-api/commit/ac2ccfff2162082fa1546cff2d0e4d3173afb673))
- 123281 change the prmissions ([da0577c](https://github.com/mohammaDJ23/expense-api/commit/da0577c9f8652e1dcee88a8d8ecfae1653a4e065))
- 123281 comment the init-filebeat-config service ([a3d3676](https://github.com/mohammaDJ23/expense-api/commit/a3d3676c25609886e9935674bb8c5b8c380725bf))
- 123281 comment the options related to cpus, mem and logs ([7c2c7c3](https://github.com/mohammaDJ23/expense-api/commit/7c2c7c316a786e9cf3e062b2ad7bc33568fbdfb8))
- 123281 create /config dir ([14a0467](https://github.com/mohammaDJ23/expense-api/commit/14a0467df64b4dd8d4cef1a8844434f53beb1aa2))
- 123281 create /secrets path ([7bf1711](https://github.com/mohammaDJ23/expense-api/commit/7bf17112665824e3c1d0597a3083febc1e5760fa))
- 123281 mount the filebeat dir not the file ([ff8a87b](https://github.com/mohammaDJ23/expense-api/commit/ff8a87b53c03ddedfef8c28c90349f618515ce2a))
- 123281 remove -environment container ([88bd2e5](https://github.com/mohammaDJ23/expense-api/commit/88bd2e5159c966105a0248eaab30ef4ad6112fcd))
- 123281 remove jq and curl and use wget ([fca36ee](https://github.com/mohammaDJ23/expense-api/commit/fca36eea4455976766baa9916bb2cf9a1eabb120))
- 123281 remove jq and curl and use wget ([c11f3c8](https://github.com/mohammaDJ23/expense-api/commit/c11f3c826893615d524c6a06befdc1746592092f))
- 123281 remove the chmod of 600 ([d6ca957](https://github.com/mohammaDJ23/expense-api/commit/d6ca9571270287cac43c95228711fe22e116ac39))
- 123281 remove the filebeat and elasticsearch services ([2c263fb](https://github.com/mohammaDJ23/expense-api/commit/2c263fb9e40ed191835848dc4c5766473da504df))
- 123281 remove the filebeat.yml file ([0aa80e6](https://github.com/mohammaDJ23/expense-api/commit/0aa80e6c60f35d75ded27f9a3f8e71d9905b63b0))
- 123281 remove the HOST_UID env ([6c599aa](https://github.com/mohammaDJ23/expense-api/commit/6c599aade614e4ade1e7b0c36b88c47720895e03))
- 123281 remove the logs for the services ([471dc10](https://github.com/mohammaDJ23/expense-api/commit/471dc10319587a73bc3b21fa4f738009bfc3b948))
- 123281 remove the scout.yaml and add vex.json file to use for scout scan action ([c5bcfd9](https://github.com/mohammaDJ23/expense-api/commit/c5bcfd9395cd9c9a16eadc053df7b2f0b7fd0854))
- 123281 run init-filebeat-keystore with user 1000:1000 ([735da78](https://github.com/mohammaDJ23/expense-api/commit/735da78dc9017f2573bec8ea96e1913832188d21))
- 123281 test the init-filebeat-config service ([c2fd4fc](https://github.com/mohammaDJ23/expense-api/commit/c2fd4fcab56b343ac6c6d3494c17c59cb8ae8891))
- 123281 test the init-filebeat-config service ([50e9033](https://github.com/mohammaDJ23/expense-api/commit/50e90336215ac02f460213a27a7f7872db854622))
- 123281 use busybox ([4067b3e](https://github.com/mohammaDJ23/expense-api/commit/4067b3eaa1a6456fb7cf16b8cfc76d64fbfd3a0b))
- 123281 use curl and ignore for scanning ([1d5af4a](https://github.com/mohammaDJ23/expense-api/commit/1d5af4a91f9ddf2d8cc854dd15c0f05518e3cb75))
- 123281 use multi line command syntax ([aaab63c](https://github.com/mohammaDJ23/expense-api/commit/aaab63cd4088f798ba7d038f4a22205c881de179))
- 123281 use ownership of 1000 for filebeat.keystore ([b276224](https://github.com/mohammaDJ23/expense-api/commit/b276224633d334f759ebb6efeac364e934e4a8ed))
- 123281 use the absolute path of filebeat.yml ([0ae488f](https://github.com/mohammaDJ23/expense-api/commit/0ae488fe116511ce3f221fd17d6fba5600bc9cbe))
- 123281 use the absolute path of filebeat.yml ([4c232b4](https://github.com/mohammaDJ23/expense-api/commit/4c232b412b0a7dbeb6b68fe9f4f477035f92aebc))
- 346926 add the json log file ([2710a39](https://github.com/mohammaDJ23/expense-api/commit/2710a39e5da97fb5e8674c890e4c9e78552acf26))
- 473121 add apiVersioning ([1ccae23](https://github.com/mohammaDJ23/expense-api/commit/1ccae23a2ba2a6275b1313ccf1365155a7bc50de))
- 473121 add appException strategy ([a35d5cf](https://github.com/mohammaDJ23/expense-api/commit/a35d5cf93dd822348ad35318d0d5af41630a76c3))
- 473121 add override to message ([b82f8b7](https://github.com/mohammaDJ23/expense-api/commit/b82f8b72a72dfdfb53d1f0e6aea2c737fc49457e))
- 473121 add some packages as overrides of pnpm ([0156de3](https://github.com/mohammaDJ23/expense-api/commit/0156de3332a78453a4e8d2b4ac2ddf12bde0b06d))
- 473121 add the appInstance module ([e9701d1](https://github.com/mohammaDJ23/expense-api/commit/e9701d1d066e3a041f644d5fa1bb6471283b57d1))
- 473121 add the overrides ([5188ee3](https://github.com/mohammaDJ23/expense-api/commit/5188ee36555b8c976517955fe9f960f1c2be4c42))
- 473121 add the version to the services ([d470cf8](https://github.com/mohammaDJ23/expense-api/commit/d470cf80c0abdeb1b70a3aa419be61239716caa2))
- 473121 export just VERSION_PROVIDER ([d8cb480](https://github.com/mohammaDJ23/expense-api/commit/d8cb4806287eff15bc5668d3288229054c645a7e))
- 473121 update pnpm-lock.yaml ([261cac2](https://github.com/mohammaDJ23/expense-api/commit/261cac223210528b164f2457a5c2a360cc34c8d5))
- 473121 upgrade axios ([f6a5954](https://github.com/mohammaDJ23/expense-api/commit/f6a595452686dbc3d168bd52184312a61d9d05f9))

## [1.1.1](https://github.com/mohammaDJ23/expense-api/compare/v1.1.0...v1.1.1) (2026-02-27)

### 🐛 Bug Fixes

- 125823 fix the modules imported from the related pacakges ([26b6995](https://github.com/mohammaDJ23/expense-api/commit/26b69950112172d29eb1e1432c4b3bdcb5b1c51e))
- 393315 add qs inside overrides to ignore the security exception ([0bd6a0a](https://github.com/mohammaDJ23/expense-api/commit/0bd6a0a7960694e3022172da894482fb5820707a))
- 393315 import RedisModule ([830e470](https://github.com/mohammaDJ23/expense-api/commit/830e470f373591d27907c871c665d6c2819d74e1))
- 393315 rename HealthService ([22df321](https://github.com/mohammaDJ23/expense-api/commit/22df32162046c229bbbf88dd0109843ad6c6892e))
- 393315 update some packages to ignore the security exception ([d473861](https://github.com/mohammaDJ23/expense-api/commit/d47386153b3562cf775aa707c0f79f293fad0d3c))

### ♻️ Code Refactoring

- 364295 use INTERNAL_SERVICE_ERROR ([d29ddcf](https://github.com/mohammaDJ23/expense-api/commit/d29ddcfa93eb115be4d9fb4327fd8b5b9b127a0e))
- 364295 use strategy pattern for extract the message of the error ([70dafc5](https://github.com/mohammaDJ23/expense-api/commit/70dafc5a21373ee9f92284e57e4e2d8ad9548f7b))

### 🔧 Configurations

- 271190 add ES_JAVA_OPTS env ([1ab14df](https://github.com/mohammaDJ23/expense-api/commit/1ab14df96bbd4b304bdc6ecb3d373814eb015aaa))
- 271190 add the elasticsearch and filebeat ([6e94799](https://github.com/mohammaDJ23/expense-api/commit/6e9479992762dc849939eb51e6fe928a75368ff3))
- 271190 add the secret related to elasticsearch ([4acdac3](https://github.com/mohammaDJ23/expense-api/commit/4acdac3a204df1b6c7c891458cfbd3734509ff48))
- 393315 add the throttle envs ([0217000](https://github.com/mohammaDJ23/expense-api/commit/0217000b7d09a17db11df2a5d76a511aef8b0d1b))
- 393315 add the throttle packages ([b3cde10](https://github.com/mohammaDJ23/expense-api/commit/b3cde10c7301d2799bbc9593154d563470da4d41))
- 393315 add the throttler configuration and setup ([a7b232e](https://github.com/mohammaDJ23/expense-api/commit/a7b232eec2214fabf93fd2a8f51c3deee19f6c0c))
- 393315 add ThrottlerModule to CommonModule ([0669703](https://github.com/mohammaDJ23/expense-api/commit/066970385d9eefea005111091cba598398e6ee4f))

### 🔧 Chores

- 125823 add some configuration related to parser, import groups and avoiding relative pathes ([81bf109](https://github.com/mohammaDJ23/expense-api/commit/81bf109e128e7de2f9adae05f47f70a6e27d7e01))
- 125823 add the custom pathes which starts with @ ([361f293](https://github.com/mohammaDJ23/expense-api/commit/361f2933b08ac9d0219cb2bd094738e73aac6ddc))
- 125823 add the ts config to the nest cli file and also do not ignore for docker ([6484357](https://github.com/mohammaDJ23/expense-api/commit/6484357a801384e672b64e6d41cc92adc9dd048d))
- 125823 modify the import pattern based on the rules ([7e3bd8b](https://github.com/mohammaDJ23/expense-api/commit/7e3bd8bb27c184422bd5db91aeaa263eb6b2e691))
- 125823 modify the pattern for import ([4055c1a](https://github.com/mohammaDJ23/expense-api/commit/4055c1aa384209212c562e53ae2d938420833d1d))
- 125823 remove the log of database ([cd199e8](https://github.com/mohammaDJ23/expense-api/commit/cd199e885740ef90b93fb58c743b86ec19d5e657))
- 271190 add the pino configuration ([867b1a6](https://github.com/mohammaDJ23/expense-api/commit/867b1a6149cc1a4c360d0d1a59edf8f9029842b9))
- 271190 export the version module and the provider name ([f784733](https://github.com/mohammaDJ23/expense-api/commit/f7847337141dd5b93c844c15dcef1e9a876a012f))
- 393315 remove the nestj indicator for healthcheck ([8f2ca5e](https://github.com/mohammaDJ23/expense-api/commit/8f2ca5e748c2b0269ced88b4cd898b6beb635ed6))
- 393315 use configService to extract dev and prod envs ([1fe9102](https://github.com/mohammaDJ23/expense-api/commit/1fe910240122aa7ca2cd00aa2e29b58223ff072d))
- 686504 add the global exception ([b555e4d](https://github.com/mohammaDJ23/expense-api/commit/b555e4d1895f0f8d7854dba30948b8339d22a66d))

## [1.1.0](https://github.com/mohammaDJ23/expense-api/compare/v1.0.6...v1.1.0) (2026-02-20)

### ✨ Features

- 037364 add the swagger configuration and module ([bab535f](https://github.com/mohammaDJ23/expense-api/commit/bab535f709a41a77a0184c922a553381310bb3ce))

### 🐛 Bug Fixes

- 880392 use import-x/no-commonjs ([86196a6](https://github.com/mohammaDJ23/expense-api/commit/86196a6bb5654c40953d4f88f591829623d9f8f7))

### ♻️ Code Refactoring

- 338882 split the constants to domains specific ([88e4acc](https://github.com/mohammaDJ23/expense-api/commit/88e4acc838b28c5585753e22244c4aa992d53387))

### 🚀 Continuous Deployment

- 880392 add the smtp_password secret ([7bf2c16](https://github.com/mohammaDJ23/expense-api/commit/7bf2c16c9cf92de8879ae11a2d39a35817c86cb6))

### 🔧 Chores

- 037364 add the resolveJsonModule option ([9ec8b3a](https://github.com/mohammaDJ23/expense-api/commit/9ec8b3a3dbc77b0913d1be34c5ec385bc14e3742))
- 037364 add the swagger and env-cmd packages ([927c426](https://github.com/mohammaDJ23/expense-api/commit/927c42621999ea1018b7ab8b292c4e4d8cdcf617))
- 037364 add the version of the app as a provider ([e0f1677](https://github.com/mohammaDJ23/expense-api/commit/e0f16773dd3a6f4bb6a149d9b0592e6850cda3bc))
- 037364 create the swagger constatns ([b49fba5](https://github.com/mohammaDJ23/expense-api/commit/b49fba55a4577a55dbfd73495c72c2076ed030b3))
- 037364 ignore no-unsafe rules ([a056879](https://github.com/mohammaDJ23/expense-api/commit/a056879fb04a128c26c2148ed294ec4ae8c7625f))
- 037364 move the version constants to the global constants ([8ad6c5f](https://github.com/mohammaDJ23/expense-api/commit/8ad6c5ffeceb294fb6d278af0dbfc111e7aab80d))
- 880392 add an internal network for redis and postgres ([ca38b32](https://github.com/mohammaDJ23/expense-api/commit/ca38b3269d0f80f77fe08d7622c645c4c45e9d90))
- 880392 add init option and make more robust around the healthcheck ([6e843b4](https://github.com/mohammaDJ23/expense-api/commit/6e843b4ac0d202b78baf7720c45670f74bc167af))
- 880392 add minimatch as overrides of pnpm ([708b6f5](https://github.com/mohammaDJ23/expense-api/commit/708b6f5ba8687f87d979160f43489b94b4d5f393))
- 880392 add some security options ([08e5588](https://github.com/mohammaDJ23/expense-api/commit/08e55889afe7d5bba39625b8c14bbaf58bc63639))
- 880392 add the healthcheck for the postgres-backup service ([3a07abf](https://github.com/mohammaDJ23/expense-api/commit/3a07abf3eb624a208d9f325b09fd1fe8b288eab5))
- 880392 add the port of production ([079f29d](https://github.com/mohammaDJ23/expense-api/commit/079f29d58df17aa9d52ec59f978724528857e59b))
- 880392 add the postgres backup service ([1dda8d8](https://github.com/mohammaDJ23/expense-api/commit/1dda8d83c60596171c703df337a2d2f40c174ca3))
- 880392 add the production pipeline ([6970f8f](https://github.com/mohammaDJ23/expense-api/commit/6970f8fdf0100ea1749f7cc3ffc5aafaf85d62e1))
- 880392 create the compose file for production mode ([5646172](https://github.com/mohammaDJ23/expense-api/commit/5646172e8ebd3a9b965a27c6f74db1554d4212a4))
- 880392 remove some security options caused to do not run the postgres backup service ([e24c47c](https://github.com/mohammaDJ23/expense-api/commit/e24c47c47f995473fc340c666bbe39ef6d114e65))
- 880392 remove the quotes around the POSTGRES_INITDB_ARGS env ([668edf7](https://github.com/mohammaDJ23/expense-api/commit/668edf75a929c10ca91f6696b3288b400fd3fbae))
- 880392 rename all MODE to PIPELINE ([6201476](https://github.com/mohammaDJ23/expense-api/commit/6201476ce7c9a0c8e57590a55ac0f0cf7e6d4c91))
- 880392 update lockfile with minimatch overrides ([671277b](https://github.com/mohammaDJ23/expense-api/commit/671277b1a6ab2fc684128325a5e5f8794ef01830))
- 880392 update the healthcheck options ([3c17c2d](https://github.com/mohammaDJ23/expense-api/commit/3c17c2de7f6bb1286f48525bc52dc9e928b6ef42))
- 880392 use 'eslint-plugin-import-x' instead of 'eslint-plugin-import' ([ecdbadf](https://github.com/mohammaDJ23/expense-api/commit/ecdbadf8e095db27620afe70e4e14412dd9225c4))
- 880392 use the key=value format ([8f2db1f](https://github.com/mohammaDJ23/expense-api/commit/8f2db1f6717e392ad5cce77cf69856a9c4046ba7))
- 880392 use the key=value format ([1aa9d46](https://github.com/mohammaDJ23/expense-api/commit/1aa9d46549a4abac8880d8c31623d9c97b7b675e))

## [1.0.6](https://github.com/mohammaDJ23/expense-api/compare/v1.0.5...v1.0.6) (2026-02-17)

### 🐛 Bug Fixes

- 880392 fix the scripts name ([d3f317a](https://github.com/mohammaDJ23/expense-api/commit/d3f317a03b72b573cc7a14c85a721126aa3277c5))

### 🔧 Continuous Integration

- 880392 update the command of entrypoint ([5dc0217](https://github.com/mohammaDJ23/expense-api/commit/5dc0217c55d742fcba34a6dcdcc3b7d737981036))

### 🚀 Continuous Deployment

- 880392 update the command of entrypoint ([7528b70](https://github.com/mohammaDJ23/expense-api/commit/7528b70e7f58cf19b10d2cc62ec187647e820a04))

### 🔧 Chores

- 880392 add some logs for creating the image ([12a1238](https://github.com/mohammaDJ23/expense-api/commit/12a123886cee0ff6bac505e825edb44d9f9d26d8))
- 880392 add the docker entrypoints based on the environments ([626c905](https://github.com/mohammaDJ23/expense-api/commit/626c905cd98d9022d371b2be8a34af99af3227dc))
- 880392 add the docker entrypoints based on the environments ([6213a72](https://github.com/mohammaDJ23/expense-api/commit/6213a72b12b4d7c1bc95b2f16b7e28b341fb1642))
- 880392 add the ENVIRONMENT env ([4527beb](https://github.com/mohammaDJ23/expense-api/commit/4527bebdd7e792b8492dbfd9459f1a7935312d4a))
- 880392 add the scripts related to creating and outputing the image ([1c3e716](https://github.com/mohammaDJ23/expense-api/commit/1c3e716a4cad79c7d0451b2e2164e0cc3845a216))
- 880392 move the docker scripts to the docker folder ([2c585ca](https://github.com/mohammaDJ23/expense-api/commit/2c585caaad1afd75b41b1ccf494dc82b2b6baf88))
- 880392 remove the ci mode ([09fac2a](https://github.com/mohammaDJ23/expense-api/commit/09fac2a0dcc92c8fe6d57ae24b7b915479e42884))
- 880392 remove the extra variables ([7c5718a](https://github.com/mohammaDJ23/expense-api/commit/7c5718a5159f443a0e89fbbb037a7cf3c2b43328))
- 880392 revise the docker start commands ([f599ae2](https://github.com/mohammaDJ23/expense-api/commit/f599ae25375be8c1a439fc8ca406a6aa02b86978))
- 880392 update the output of the github ([0ea19a9](https://github.com/mohammaDJ23/expense-api/commit/0ea19a9379d15aa33795f0b1350b6fbe34347ec2))

## [1.0.5](https://github.com/mohammaDJ23/expense-api/compare/v1.0.4...v1.0.5) (2026-02-15)

### 🚀 Continuous Deployment

- 842373 remove the summary job and swap the create version step ([0b06a94](https://github.com/mohammaDJ23/expense-api/commit/0b06a9471ab70f240346ac24b32048fd2af282df))

### 🔧 Chores

- 842373 remove github output for the images ([ed811a5](https://github.com/mohammaDJ23/expense-api/commit/ed811a58fe64cbca9f4f13f3a0be0fe8d4e10225))

## [1.0.4](https://github.com/mohammaDJ23/expense-api/compare/v1.0.3...v1.0.4) (2026-02-15)

### 🔧 Chores

- 842373 add a command to format the CHANGELOG.md and package.json files ([3862979](https://github.com/mohammaDJ23/expense-api/commit/386297951797d000fe86f0aaad21656cd95c026d))
- 842373 add the @semantic-release/exec package ([d38ef98](https://github.com/mohammaDJ23/expense-api/commit/d38ef98d6d695f01e064dfce0b081ea36837f351))
- 842373 add the postinstall command for formatting the pnpm-lock.yaml file ([055a424](https://github.com/mohammaDJ23/expense-api/commit/055a4243c4f78978d5779f72bb52dd37e82377a1))
- 842373 format CHANGELOG.md ([99e131d](https://github.com/mohammaDJ23/expense-api/commit/99e131d2582a7df25e841ab609e3217f39d9ddd7))
- 842373 remove {} around GITHUB_OUTPUT ([f6c65fd](https://github.com/mohammaDJ23/expense-api/commit/f6c65fd434455e63f2768dc5c827c7c36783f57c))

## [1.0.3](https://github.com/mohammaDJ23/expense-api/compare/v1.0.2...v1.0.3) (2026-02-15)

### 🚀 Continuous Deployment

- 842373 use the version instead of sha ([5ab1bfc](https://github.com/mohammaDJ23/expense-api/commit/5ab1bfcaff74488c229041be1c0f9acfdd28edd4))

### 🔧 Chores

- 842373 format the CHANGELOG.md file ([421436f](https://github.com/mohammaDJ23/expense-api/commit/421436f87f74b57698487f86b3e378bccd4a08f8))

## [1.0.2](https://github.com/mohammaDJ23/expense-api/compare/v1.0.1...v1.0.2) (2026-02-15)

### 🔧 Chores

- 842373 format Dockerfile ([0a133ac](https://github.com/mohammaDJ23/expense-api/commit/0a133ac55571ea85efcc326d641eae49c60f37f8))
- add the CHANGELOG.md ([8495d2f](https://github.com/mohammaDJ23/expense-api/commit/8495d2fa214b6c75c679aeca4fbe798c9e4e0322))
