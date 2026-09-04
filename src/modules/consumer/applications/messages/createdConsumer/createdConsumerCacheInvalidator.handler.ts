import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ConsumerCacheInvalidatorProcessor } from '@/modules/consumer/applications/messages/consumerCacheInvalidator.processor';
import { ConsumerMessageEvent } from '@/modules/consumer/domain/enums/consumerMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@MessageHandler(ConsumerMessageEvent.CREATED_CONSUMER)
export class CreatedConsumerCacheInvalidatorHandler implements IMessageHandler<ISelectConsumer> {
    constructor(
        private readonly consumerCacheInvalidatorProcessor: ConsumerCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        await this.consumerCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
