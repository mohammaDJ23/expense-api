import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { getNodeEnv } from '@/common/utils/environments.util';
import { CoreModule } from '@/core/core.module';
import { VersionService } from '@/core/services/version.service';

@Module({
    imports: [
        PinoLoggerModule.forRootAsync({
            imports: [CoreModule],
            inject: [ConfigService, VersionService],
            useFactory: (configService: ConfigService, versionProvider: VersionService) => {
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
