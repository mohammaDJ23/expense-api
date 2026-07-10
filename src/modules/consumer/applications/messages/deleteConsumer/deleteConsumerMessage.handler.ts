import { MessageHandler } from '@/core/message/messageHandler.decorator';

import { DeleteConsumerMessageElasticsearchProcessor } from './deleteConsumerMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageHandler } from '@/core/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';

@MessageHandler()
export class DeleteConsumerMessageHandler implements IMessageHandler<ISelectConsumer> {
    route: TOutboxEventRoute = 'consumers.deleted';

    constructor(
        private readonly deleteConsumerMessageElasticsearchProcessor: DeleteConsumerMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectConsumer>[] = [
            this.deleteConsumerMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
