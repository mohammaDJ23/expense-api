import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class DeleteLocationMessageElasticsearchProcessor implements IMessageProcessor<ISelectLocation> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk({ operations });
    }
}
