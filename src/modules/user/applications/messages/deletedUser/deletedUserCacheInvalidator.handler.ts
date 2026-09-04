import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { UserCacheInvalidatorProcessor } from '@/modules/user/applications/messages/userCacheInvalidator.processor';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    constructor(private readonly userCacheInvalidatorProcessor: UserCacheInvalidatorProcessor) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.userCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
