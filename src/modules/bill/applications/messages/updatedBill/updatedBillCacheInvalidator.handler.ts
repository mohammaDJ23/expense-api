import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillCacheInvalidatorProcessor } from '@/modules/bill/applications/messages/billCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class UpdatedBillCacheInvalidatorHandler implements IMessageHandler<ISelectBill> {
    route: TOutboxEventRoute = 'bills.updated';

    constructor(private readonly billCacheInvalidatorProcessor: BillCacheInvalidatorProcessor) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        await this.billCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
