import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IProcessor } from '@/core/interfaces/processor.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ReceiverElasticsearchIndexerProcessor implements IProcessor<
    IMessageBatch<ISelectReceiver>[],
    void
> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(input: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        const operations = input.flatMap<estypes.BulkOperationContainer | ISelectReceiver>(
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
