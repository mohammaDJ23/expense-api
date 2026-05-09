import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { getNodeEnv } from '@/common/utils/environments.util';
import { VERSION_PROVIDER } from '@/infrastructure/version/version.constants';
import { VersionModule } from '@/infrastructure/version/version.module';

import type { IVersionProvider } from '@/infrastructure/version/version.interface';

@Module({
    imports: [
        PinoLoggerModule.forRootAsync({
            imports: [VersionModule],
            inject: [ConfigService, VERSION_PROVIDER],
            useFactory: (configService: ConfigService, versionProvider: IVersionProvider) => {
                return {
                    pinoHttp: {
                        autoLogging: {
                            ignore: (req) => {
                                return Boolean(
                                    req.url === '/v1/api/health' ||
                                    req.url?.startsWith('/v1/api/health'),
                                );
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
