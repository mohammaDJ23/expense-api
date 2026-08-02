import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class DeleteConsumerMessageElasticsearchProcessor implements IMessageProcessor<ISelectConsumer> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk({ operations });
    }
}
