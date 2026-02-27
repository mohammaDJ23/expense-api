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
