import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ConsumerCacheInvalidatorProcessor } from '@/modules/consumer/applications/messages/consumerCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class DeletedUserConsumerCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'users.deleted';

    constructor(
        private readonly consumerCacheInvalidatorProcessor: ConsumerCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.consumerCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
