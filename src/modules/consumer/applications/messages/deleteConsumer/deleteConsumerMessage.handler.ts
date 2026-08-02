import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { DeleteConsumerMessageElasticsearchProcessor } from './deleteConsumerMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

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
