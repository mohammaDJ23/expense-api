import { MessageHandler } from '@/core/message/messageHandler.decorator';

import { UpdateReceiverMessageElasticsearchProcessor } from './updateReceiverMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageHandler } from '@/core/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';
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
