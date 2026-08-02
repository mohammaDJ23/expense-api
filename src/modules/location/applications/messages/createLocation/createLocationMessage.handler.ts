import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { CreateLocationMessageElasticsearchProcessor } from './createLocationMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class CreateLocationMessageHandler implements IMessageHandler<ISelectLocation> {
    route: TOutboxEventRoute = 'locations.created';

    constructor(
        private readonly createLocationMessageElasticsearchProcessor: CreateLocationMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectLocation>[] = [
            this.createLocationMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
