import { MessageHandler } from '@/core/message/messageHandler.decorator';

import { UpdateBillMessageElasticsearchProcessor } from './updateBillMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageHandler } from '@/core/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';

@MessageHandler()
export class UpdateBillMessageHandler implements IMessageHandler<ISelectBill> {
    route: TOutboxEventRoute = 'bills.updated';

    constructor(
        private readonly updateBillMessageElasticsearchProcessor: UpdateBillMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectBill>[] = [
            this.updateBillMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
