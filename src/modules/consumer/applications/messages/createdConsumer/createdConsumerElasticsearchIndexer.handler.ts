import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ConsumerElasticsearchIndexerProcessor } from '@/modules/consumer/applications/messages/consumerElasticsearchIIndexer.processor';
import { ConsumerMessageEvent } from '@/modules/consumer/domain/enums/consumerMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@MessageHandler(ConsumerMessageEvent.CREATED_CONSUMER)
export class CreatedConsumerElasticsearchIndexerHandler implements IMessageHandler<ISelectConsumer> {
    constructor(
        private readonly consumerElasticsearchIndexerProcessor: ConsumerElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        await this.consumerElasticsearchIndexerProcessor.process(batch);
    }
}
