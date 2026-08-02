import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { DeleteLocationMessageElasticsearchProcessor } from './deleteLocationMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeleteLocationMessageHandler implements IMessageHandler<ISelectLocation> {
    route: TOutboxEventRoute = 'locations.deleted';

    constructor(
        private readonly deleteLocationMessageElasticsearchProcessor: DeleteLocationMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectLocation>[] = [
            this.deleteLocationMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
