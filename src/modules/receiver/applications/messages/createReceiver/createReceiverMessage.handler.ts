import { MessageHandler } from '@/core/message/messageHandler.decorator';

import { CreateReceiverMessageElasticsearchProcessor } from './createReceiverMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageHandler } from '@/core/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler()
export class CreateReceiverMessageHandler implements IMessageHandler<ISelectReceiver> {
    aggregateType: TOutboxEventAggregateType = 'receivers';

    constructor(
        private readonly createReceiverMessageElasticsearch: CreateReceiverMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectReceiver>[] = [
            this.createReceiverMessageElasticsearch,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
