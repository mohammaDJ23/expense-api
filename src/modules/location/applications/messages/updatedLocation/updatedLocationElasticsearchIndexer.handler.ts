import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocationElasticsearchIndexerProcessor } from '@/modules/location/applications/messages/locationElasticsearchIndexer.processor';
import { LocationMessageEvent } from '@/modules/location/domain/enums/locationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@MessageHandler(LocationMessageEvent.UPDATED_LOCATION)
export class UpdatedLocationElasticsearchIndexerHandler implements IMessageHandler<ISelectLocation> {
    constructor(
        private readonly locationElasticsearchIndexerProcessor: LocationElasticsearchIndexerProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        await this.locationElasticsearchIndexerProcessor.process(batch);
    }
}
