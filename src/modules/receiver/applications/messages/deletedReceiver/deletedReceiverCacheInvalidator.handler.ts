import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ReceiverCacheInvalidatorProcessor } from '@/modules/receiver/applications/messages/receiverCacheInvalidator.processor';
import { ReceiverMessageEvent } from '@/modules/receiver/domain/enums/receiverMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler(ReceiverMessageEvent.DELETED_RECEIVER)
export class DeletedReceiverCacheInvalidatorHandler implements IMessageHandler<ISelectReceiver> {
    constructor(
        private readonly receiverCacheInvalidatorProcessor: ReceiverCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        await this.receiverCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
