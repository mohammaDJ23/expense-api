import { MessageHandler } from '@/core/message/messageHandler.decorator';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageHandler } from '@/core/message/messageHandler.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler()
export class CreateReceiverMessageHandler implements IMessageHandler<ISelectReceiver> {
    aggregateType: TOutboxEventAggregateType = 'receivers';

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        await Promise.allSettled([]);
    }
}
