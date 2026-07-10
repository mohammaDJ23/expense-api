import { MessageHandler } from '@/core/message/messageHandler.decorator';

import { CreateBillMessageElasticsearchProcessor } from './createBillMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageHandler } from '@/core/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';

@MessageHandler()
export class CreateBillMessageHandler implements IMessageHandler<ISelectBill> {
    route: TOutboxEventRoute = 'bills.created';

    constructor(
        private readonly createBillMessageElasticsearchProcessor: CreateBillMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectBill>[] = [
            this.createBillMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
