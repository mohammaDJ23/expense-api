import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { VerificationMailerService } from '@/modules/authentication/applications/services/verificationMailer.service';
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
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    async execute(batch: IMessageBatch<ILocalSignupMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(async () => {
                    await this.verificationStorageService.set(
                        item.payload.email,
                        item.payload.token,
                    );
                    await this.verificationMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
