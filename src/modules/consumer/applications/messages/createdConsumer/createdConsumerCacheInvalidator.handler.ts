import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ConsumerCacheInvalidatorProcessor } from '@/modules/consumer/applications/messages/consumerCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class CreatedConsumerCacheInvalidatorHandler implements IMessageHandler<ISelectConsumer> {
    route: TOutboxEventRoute = 'consumer.created';

    constructor(
        private readonly consumerCacheInvalidatorProcessor: ConsumerCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        await this.consumerCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
