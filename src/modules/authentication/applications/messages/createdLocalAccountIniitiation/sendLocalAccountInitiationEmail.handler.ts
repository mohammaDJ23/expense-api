import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocalAccountInitiationMailerService } from '@/modules/authentication/applications/services/localAccountInitiationMailer.service';
import { LocalAccountStorageService } from '@/modules/authentication/applications/services/localAccountStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalAccountInitiationMessagePayload } from '@/modules/authentication/domain/types/localAccountInitiationMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class SendLocalAccountInitiationEmailHandler implements IMessageHandler<ILocalAccountInitiationMessagePayload> {
    route: TOutboxEventRoute = 'local_account_initiation.created';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly localAccountStorageService: LocalAccountStorageService,
        private readonly localAccountInitiationMailerService: LocalAccountInitiationMailerService,
    ) {}

    async execute(batch: IMessageBatch<ILocalAccountInitiationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(async () => {
                    await this.localAccountStorageService.delete(item.payload.email);
                    await this.localAccountStorageService.set(
                        item.payload.email,
                        item.payload.token,
                    );
                    await this.localAccountInitiationMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
