import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IProcessor } from '@/core/interfaces/processor.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ConsumerElasticsearchIndexerProcessor implements IProcessor<
    IMessageBatch<ISelectConsumer>[],
    void
> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(input: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        const operations = input.flatMap<estypes.BulkOperationContainer | ISelectConsumer>(
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
