import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class DeleteBillMessageElasticsearchProcessor implements IMessageProcessor<ISelectBill> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk({ operations });
    }
}
