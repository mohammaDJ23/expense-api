import { Injectable } from '@nestjs/common';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyBillsByUserIdAndIdsService } from '@/modules/bill/applications/services/findManyBillsByUserIdAndIds.service';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';

@Injectable()
export class BillSearchAggregateService implements IElasticsearchSearchAggregate<IBill> {
    constructor(
        private readonly findManyBillsByUserIdAndIdsService: FindManyBillsByUserIdAndIdsService,
    ) {}

    aggregate(userId: string, ids: string[]): Promise<IBill[]> {
        return whenNotEmpty(ids, (ids) =>
            this.findManyBillsByUserIdAndIdsService.execute({
                userId,
                billIds: ids,
            }),
        );
    }
}
