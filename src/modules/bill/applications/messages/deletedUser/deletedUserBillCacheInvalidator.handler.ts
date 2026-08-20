import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillCacheInvalidatorProcessor } from '@/modules/bill/applications/messages/billCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class DeletedUserBillCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'user.deleted';

    constructor(private readonly billCacheInvalidatorProcessor: BillCacheInvalidatorProcessor) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.billCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
