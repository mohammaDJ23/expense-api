import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IProcessor } from '@/core/interfaces/processor.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class LocationElasticsearchIndexerProcessor implements IProcessor<
    IMessageBatch<ISelectLocation>[],
    void
> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(input: IMessageBatch<ISelectLocation>[]): Promise<void> {
        const operations = input.flatMap<estypes.BulkOperationContainer | ISelectLocation>(
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
