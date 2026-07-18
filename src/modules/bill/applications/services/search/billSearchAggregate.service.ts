import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyBillsByUserIdAndIdsQuery } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class BillSearchAggregateService implements IElasticsearchSearchAggregate<IBill> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    aggregate(userId: string, ids: string[]): Promise<IBill[]> {
        return whenNotEmpty(ids, async (ids) => {
            const bills = await this.queryBus.execute<
                FindManyBillsByUserIdAndIdsQuery,
                ISelectBill[]
            >(
                new FindManyBillsByUserIdAndIdsQuery({
                    userId,
                    ids,
                }),
            );
            return this.billsAssemblerService.assemble({ userId, bills });
        });
    }
}
