import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/message/messageBatch.type';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class CreateConsumerMessageElasticsearchProcessor implements IMessageProcessor<ISelectConsumer> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        const operations = batch.flatMap<estypes.BulkOperationContainer | ISelectConsumer>(
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
