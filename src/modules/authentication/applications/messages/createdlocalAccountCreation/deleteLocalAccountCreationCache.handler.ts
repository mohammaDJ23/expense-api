import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocalAccountStorageService } from '@/modules/authentication/applications/services/localAccountStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalAccountCreationMessagePayload } from '@/modules/authentication/domain/types/localAccountCreationMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeleteLocalAccountCreationCacheHandler implements IMessageHandler<ILocalAccountCreationMessagePayload> {
    route: TOutboxEventRoute = 'local_account_creation.created';
    private readonly concurrency = pLimit(2);

    constructor(private readonly localAccountStorageService: LocalAccountStorageService) {}

    async execute(batch: IMessageBatch<ILocalAccountCreationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(() => this.localAccountStorageService.delete(item.payload.email)),
            ),
        );
    }
}
