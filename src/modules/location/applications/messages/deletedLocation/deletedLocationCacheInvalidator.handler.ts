import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocationCacheInvalidatorProcessor } from '@/modules/location/applications/messages/locationCacheInvalidator.processor';
import { LocationMessageEvent } from '@/modules/location/domain/enums/locationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@MessageHandler(LocationMessageEvent.DELETED_LOCATION)
export class DeletedLocationCacheInvalidatorHandler implements IMessageHandler<ISelectLocation> {
    constructor(
        private readonly locationCacheInvalidatorProcessor: LocationCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        await this.locationCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
