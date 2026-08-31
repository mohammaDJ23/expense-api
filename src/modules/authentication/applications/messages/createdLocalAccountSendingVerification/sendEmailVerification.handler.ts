import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocalAccountVerificationMailerService } from '@/modules/authentication/applications/services/localAccountVerificationMailer.service';
import { LocalAccountVerificationStorageService } from '@/modules/authentication/applications/services/localAccountVerificationStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalSendVerificationMessagePayload } from '@/modules/authentication/domain/types/localSendVerificationMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class SendEmailVerificationHandler implements IMessageHandler<ILocalSendVerificationMessagePayload> {
    route: TOutboxEventRoute = 'local_account_sending_verification.created';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly localAccountVerificationMailerService: LocalAccountVerificationMailerService,
        private readonly localAccountVerificationStorageService: LocalAccountVerificationStorageService,
    ) {}

    async execute(batch: IMessageBatch<ILocalSendVerificationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(async () => {
                    await this.localAccountVerificationStorageService.delete(item.payload.email);
                    await this.localAccountVerificationStorageService.set(
                        item.payload.email,
                        item.payload.token,
                    );
                    await this.localAccountVerificationMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
