import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ReceiverElasticsearchIndexerProcessor } from '@/modules/receiver/applications/messages/receiverElasticsearchIndexer.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler()
export class UpdatedReceiverElasticsearchIndexerHandler implements IMessageHandler<ISelectReceiver> {
    route: TOutboxEventRoute = 'receiver.updated';

    constructor(
        private readonly receiverElasticsearchIndexerProcessor: ReceiverElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        await this.receiverElasticsearchIndexerProcessor.process(batch);
    }
}
