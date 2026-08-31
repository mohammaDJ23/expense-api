import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocalSignupInitiationMailerService } from '@/modules/authentication/applications/services/localSignupInitiationMailer.service';
import { LocalSignupStorageService } from '@/modules/authentication/applications/services/localSignupStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalSignupInitiationMessagePayload } from '@/modules/authentication/domain/types/localSignupInitiationMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class SendSignupInitiationEmailHandler implements IMessageHandler<ILocalSignupInitiationMessagePayload> {
    route: TOutboxEventRoute = 'local_signup_initiation.created';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly localSignupStorageService: LocalSignupStorageService,
        private readonly localSignupInitiationMailerService: LocalSignupInitiationMailerService,
    ) {}

    async execute(batch: IMessageBatch<ILocalSignupInitiationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(async () => {
                    await this.localSignupStorageService.delete(item.payload.email);
                    await this.localSignupStorageService.set(
                        item.payload.email,
                        item.payload.token,
                    );
                    await this.localSignupInitiationMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
