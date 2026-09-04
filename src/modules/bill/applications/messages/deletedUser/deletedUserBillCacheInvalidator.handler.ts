import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillCacheInvalidatorProcessor } from '@/modules/bill/applications/messages/billCacheInvalidator.processor';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserBillCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    constructor(private readonly billCacheInvalidatorProcessor: BillCacheInvalidatorProcessor) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.billCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
