import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { BillElasticsearchIndexerProcessor } from '@/modules/bill/applications/messages/billElasticsearchIndexer.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class UpdatedBillElasticsearchIndexerHandler implements IMessageHandler<ISelectBill> {
    route: TOutboxEventRoute = 'bills.updated';

    constructor(
        private readonly billElasticsearchIndexerProcessor: BillElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        await this.billElasticsearchIndexerProcessor.process(batch);
    }
}
