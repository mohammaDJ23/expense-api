import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class CreateLocationMessageElasticsearchProcessor implements IMessageProcessor<ISelectLocation> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const operations = batch.flatMap<estypes.BulkOperationContainer | ISelectLocation>(
            (item) => [
                {
                    index: {
                        _index: item.aggregateType,
                        _id: item.aggregateId,
                    },
                },
                item.payload,
            ],
        );

        await this.elasticsearchService.bulk({ operations });
    }
}
