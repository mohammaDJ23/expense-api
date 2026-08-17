import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IProcessor } from '@/core/interfaces/processor.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillElasticsearchIndexerProcessor implements IProcessor<
    IMessageBatch<ISelectBill>[],
    void
> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(input: IMessageBatch<ISelectBill>[]): Promise<void> {
        const operations = input.flatMap<estypes.BulkOperationContainer | ISelectBill>((item) => [
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
