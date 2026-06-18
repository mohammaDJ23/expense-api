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
