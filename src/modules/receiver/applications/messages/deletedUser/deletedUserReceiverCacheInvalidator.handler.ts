import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ReceiverCacheInvalidatorProcessor } from '@/modules/receiver/applications/messages/receiverCacheInvalidator.processor';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserReceiverCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    constructor(
        private readonly receiverCacheInvalidatorProcessor: ReceiverCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.receiverCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
