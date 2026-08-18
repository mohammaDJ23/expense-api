import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ReceiverCacheInvalidatorProcessor } from '@/modules/receiver/applications/messages/receiverCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler()
export class CreatedReceiverCacheInvalidatorHandler implements IMessageHandler<ISelectReceiver> {
    route: TOutboxEventRoute = 'receivers.created';

    constructor(
        private readonly receiverCacheInvalidatorProcessor: ReceiverCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        await this.receiverCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
