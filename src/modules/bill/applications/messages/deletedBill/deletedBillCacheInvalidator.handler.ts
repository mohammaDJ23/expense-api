import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillCacheInvalidatorProcessor } from '@/modules/bill/applications/messages/billCacheInvalidator.processor';
import { BillMessageEvent } from '@/modules/bill/domain/enums/billMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@MessageHandler(BillMessageEvent.DELETED_BILL)
export class DeletedBillCacheInvalidatorHandler implements IMessageHandler<ISelectBill> {
    constructor(private readonly billCacheInvalidatorProcessor: BillCacheInvalidatorProcessor) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        await this.billCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
