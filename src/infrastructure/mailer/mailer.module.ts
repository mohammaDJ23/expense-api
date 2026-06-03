import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule as BaseMailerModule } from '@nestjs-modules/mailer';

import { readSecret } from '@/common/utils/readSecret.util';

@Module({
    imports: [
        BaseMailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    transport: {
                        host: configService.getOrThrow('MAIL_HOST'),
                        port: parseInt(configService.getOrThrow('MAIL_PORT'), 10),
                        secure: configService.getOrThrow('MAIL_SECURE') === 'true',
                        auth: {
                            user: readSecret(configService.getOrThrow('MAIL_USERNAME_FILE')),
                            pass: readSecret(configService.getOrThrow('MAIL_PASSWORD_FILE')),
                        },
                        tls: {
                            rejectUnauthorized:
                                configService.getOrThrow('MAIL_TLS_REJECT_UNAUTHORIZED') === 'true',
                        },
                        connectionTimeout: parseInt(
                            configService.getOrThrow('MAIL_CONNECTION_TIMEOUT'),
                            10,
                        ),
                        greetingTimeout: parseInt(
                            configService.getOrThrow('MAIL_GREETING_TIMEOUT'),
                            10,
                        ),
                    },
                    defaults: {
                        from: configService.getOrThrow('MAIL_FROM'),
                    },
                };
            },
        }),
    ],
})
export class MailerModule {}
