import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { CreateReceiverMessageElasticsearchProcessor } from './createReceiverMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@MessageHandler()
export class CreateReceiverMessageHandler implements IMessageHandler<ISelectReceiver> {
    route: TOutboxEventRoute = 'receivers.created';

    constructor(
        private readonly createReceiverMessageElasticsearchProcessor: CreateReceiverMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectReceiver>[] = [
            this.createReceiverMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
