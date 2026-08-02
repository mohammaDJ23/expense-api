import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { DeleteBillMessageElasticsearchProcessor } from './deleteBillMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeleteBillMessageHandler implements IMessageHandler<ISelectBill> {
    route: TOutboxEventRoute = 'bills.deleted';

    constructor(
        private readonly deleteBillMessageElasticsearchProcessor: DeleteBillMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectBill>[] = [
            this.deleteBillMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
