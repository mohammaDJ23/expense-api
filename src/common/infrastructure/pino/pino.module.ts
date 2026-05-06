import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { VERSION_PROVIDER } from '@/common/infrastructure/version/version.constants';
import { VersionModule } from '@/common/infrastructure/version/version.module';
import { getNodeEnv } from '@/common/utils/environments.util';

import type { IVersionProvider } from '@/common/infrastructure/version/version.interface';

@Module({
    imports: [
        PinoLoggerModule.forRootAsync({
            imports: [VersionModule],
            inject: [ConfigService, VERSION_PROVIDER],
            useFactory: (configService: ConfigService, versionProvider: IVersionProvider) => {
                return {
                    pinoHttp: {
                        autoLogging: {
                            ignore: () => {
                                return false;
                            },
                        },
                        mixin: () => {
                            return {
                                env: getNodeEnv(configService),
                                version: versionProvider.getVersion(),
                            };
                        },
                    },
                };
            },
        }),
    ],
    exports: [LoggerModule],
})
export class LoggerModule {}
