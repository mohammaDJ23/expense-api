import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillElasticsearchIndexerProcessor } from '@/modules/bill/applications/messages/billElasticsearchIndexer.processor';
import { BillMessageEvent } from '@/modules/bill/domain/enums/billMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@MessageHandler(BillMessageEvent.UPDATED_BILL)
export class UpdatedBillElasticsearchIndexerHandler implements IMessageHandler<ISelectBill> {
    constructor(
        private readonly billElasticsearchIndexerProcessor: BillElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        await this.billElasticsearchIndexerProcessor.process(batch);
    }
}
