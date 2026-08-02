import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { UpdateReceiverMessageElasticsearchProcessor } from './updateReceiverMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler()
export class UpdateReceiverMessageHandler implements IMessageHandler<ISelectReceiver> {
    route: TOutboxEventRoute = 'receivers.updated';

    constructor(
        private readonly updateReceiverMessageElasticsearch: UpdateReceiverMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectReceiver>[] = [
            this.updateReceiverMessageElasticsearch,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
