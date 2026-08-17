import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ConsumerElasticsearchIIndexerProcessor } from '@/modules/consumer/applications/messages/consumerElasticsearchIIndexer.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class UpdatedConsumerElasticsearchRemoverHandler implements IMessageHandler<ISelectConsumer> {
    route: TOutboxEventRoute = 'consumers.updated';

    constructor(
        private readonly consumerElasticsearchIIndexerProcessor: ConsumerElasticsearchIIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        await this.consumerElasticsearchIIndexerProcessor.process(batch);
    }
}
