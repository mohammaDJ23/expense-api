import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class DeleteReceiverMessageElasticsearchProcessor implements IMessageProcessor<ISelectReceiver> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk(operations);
    }
}
