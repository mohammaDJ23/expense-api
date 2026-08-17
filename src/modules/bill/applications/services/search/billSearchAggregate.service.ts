import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyBillsByUserIdAndIdsQuery } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class BillSearchAggregateService implements IElasticsearchSearchAggregate<IBill> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    aggregate(userId: string, ids: string[]): Promise<IBill[]> {
        return whenNotEmpty(ids, async (ids) => {
            const bills = await this.queryDispatcher.execute<
                FindManyBillsByUserIdAndIdsQuery,
                ISelectBill[]
            >(
                new FindManyBillsByUserIdAndIdsQuery({
                    userId,
                    ids,
                }),
            );
            return this.billsAssemblerService.assemble({
                userId,
                bills,
            });
        });
    }
}
