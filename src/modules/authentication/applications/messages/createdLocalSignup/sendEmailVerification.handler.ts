import { MailerService } from '@nestjs-modules/mailer';
import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalSignupMessagePayload } from '@/modules/authentication/domain/types/localSignupMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class SendEmailVerificationHandler implements IMessageHandler<ILocalSignupMessagePayload> {
    route: TOutboxEventRoute = 'local_signup.created';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly mailerService: MailerService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    async execute(batch: IMessageBatch<ILocalSignupMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(async () => {
                    try {
                        await this.verificationStorageService.set(
                            item.payload.email,
                            item.payload.token,
                        );

                        await this.mailerService.sendMail({
                            to: item.payload.email,
                            subject: 'Verify Your Email Address',
                            html: `
                                <div style="font-family: Arial, sans-serif;">
                                    <p>Hello <strong>${item.payload.email}</strong>,</p>
                                    
                                    <p>Thank you for registering! Please verify your email address to activate your account.</p>
                                    
                                    <p>
                                        Click the link below to verify your email:<br/>
                                        <a href="${process.env.APP_URL}/authentication/verification?token=${item.payload.token}" style="font-weight: bold; color: #0066cc;">
                                            Verify my account
                                        </a>
                                    </p>
                                    
                                    <p>Best regards,<br/>Your Team</p>
                                </div>
                            `,
                        });
                    } catch {
                        try {
                            await this.verificationStorageService.delete(item.payload.email);
                        } catch {}
                    }
                }),
            ),
        );
    }
}
