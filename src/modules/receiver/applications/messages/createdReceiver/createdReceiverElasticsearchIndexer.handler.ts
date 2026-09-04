import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ReceiverElasticsearchIndexerProcessor } from '@/modules/receiver/applications/messages/receiverElasticsearchIndexer.processor';
import { ReceiverMessageEvent } from '@/modules/receiver/domain/enums/receiverMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler(ReceiverMessageEvent.CREATED_RECEIVER)
export class CreatedReceiverElasticsearchIndexerHandler implements IMessageHandler<ISelectReceiver> {
    constructor(
        private readonly receiverElasticsearchIndexerProcessor: ReceiverElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        await this.receiverElasticsearchIndexerProcessor.process(batch);
    }
}
