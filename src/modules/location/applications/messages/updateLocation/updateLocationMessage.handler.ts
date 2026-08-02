import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { UpdateLocationMessageElasticsearchProcessor } from './updateLocationMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class UpdateLocationMessageHandler implements IMessageHandler<ISelectLocation> {
    route: TOutboxEventRoute = 'locations.updated';

    constructor(
        private readonly updateLocationMessageElasticsearchProcessor: UpdateLocationMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectLocation>[] = [
            this.updateLocationMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
