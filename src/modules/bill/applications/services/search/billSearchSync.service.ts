import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findBillListByUserIdService: FindBillListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = 'bills';

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
