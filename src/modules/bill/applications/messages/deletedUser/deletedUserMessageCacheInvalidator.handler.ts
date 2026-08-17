import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillMessageCacheInvalidatorProcessor } from '@/modules/bill/applications/messages/billMessageCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class DeletedUserMessageCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'users.deleted';

    constructor(
        private readonly billMessageCacheInvalidatorProcessor: BillMessageCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.billMessageCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
