import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ConsumerCacheInvalidatorProcessor } from '@/modules/consumer/applications/messages/consumerCacheInvalidator.processor';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserConsumerCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    constructor(
        private readonly consumerCacheInvalidatorProcessor: ConsumerCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.consumerCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
