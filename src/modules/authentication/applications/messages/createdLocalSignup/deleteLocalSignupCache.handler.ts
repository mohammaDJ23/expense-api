import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocalSignupStorageService } from '@/modules/authentication/applications/services/localSignupStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalSignupInitiationMessagePayload } from '@/modules/authentication/domain/types/localSignupInitiationMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeleteLocalSignupCacheHandler implements IMessageHandler<ILocalSignupInitiationMessagePayload> {
    route: TOutboxEventRoute = 'local_signup.created';
    private readonly concurrency = pLimit(2);

    constructor(private readonly localSignupStorageService: LocalSignupStorageService) {}

    async execute(batch: IMessageBatch<ILocalSignupInitiationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(() => this.localSignupStorageService.delete(item.payload.email)),
            ),
        );
    }
}
