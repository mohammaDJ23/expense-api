import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocationElasticsearchIndexerProcessor } from '@/modules/location/applications/messages/locationElasticsearchIndexer.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class CreatedLocationElasticsearchIndexerHandler implements IMessageHandler<ISelectLocation> {
    route: TOutboxEventRoute = 'location.created';

    constructor(
        private readonly locationElasticsearchIndexerProcessor: LocationElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        await this.locationElasticsearchIndexerProcessor.process(batch);
    }
}
