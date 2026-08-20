import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocationCacheInvalidatorProcessor } from '@/modules/location/applications/messages/locationCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeletedLocationCacheInvalidatorHandler implements IMessageHandler<ISelectLocation> {
    route: TOutboxEventRoute = 'location.deleted';

    constructor(
        private readonly locationCacheInvalidatorProcessor: LocationCacheInvalidatorProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        await this.locationCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.userId),
        });
    }
}
