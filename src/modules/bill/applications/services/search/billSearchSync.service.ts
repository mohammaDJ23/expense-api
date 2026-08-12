import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';
import { BillElasticsearchDeleteQuery } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearchDelete.query';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findBillListByUserIdService: FindBillListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billElasticsearchDeleteQuery: BillElasticsearchDeleteQuery,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = 'bills';

        await this.elasticsearchService.deleteByQuery(
            this.billElasticsearchDeleteQuery.buildQuery({
                userId,
            }),
        );

        for await (const bills of cursorIterator((cursor) =>
            this.findBillListByUserIdService.execute({
                userId,
                query: {
                    limit: MAX_LIST_LIMIT,
                    cursor,
                },
            }),
        )) {
            const operations = bills.flatMap<estypes.BulkOperationContainer | IBill>((bill) => [
                {
                    index: {
                        _index: index,
                        _id: bill.id,
                    },
                },
                bill,
            ]);
            await this.elasticsearchService.bulk({
                operations,
                refresh: false,
            });
        }

        await this.elasticsearchService.refresh(index);
    }
}
