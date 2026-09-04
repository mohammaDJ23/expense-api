import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { LocationMessageEvent } from '@/modules/location/domain/enums/locationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { estypes } from '@elastic/elasticsearch';

@MessageHandler(LocationMessageEvent.DELETED_LOCATION)
export class DeletedLocationElasticsearchRemoverHandler implements IMessageHandler<ISelectLocation> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk({ operations });
    }
}
