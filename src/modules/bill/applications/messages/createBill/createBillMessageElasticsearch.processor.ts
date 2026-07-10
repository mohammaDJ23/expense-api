import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class CreateBillMessageElasticsearchProcessor implements IMessageProcessor<ISelectBill> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        const operations = batch.flatMap<estypes.BulkOperationContainer | ISelectBill>((item) => [
            {
                index: {
                    _index: item.aggregateType,
                    _id: item.aggregateId,
                },
            },
            item.payload,
        ]);

        await this.elasticsearchService.bulk({ operations });
    }
}
