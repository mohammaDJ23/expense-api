import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.query';

import type { IManyRelationsLoaderByUserIdService } from '@/core/interfaces/relationLoaders/manyRelationsLoaderByUserIdService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@Injectable()
export class BillConsumerRelationLoaderService implements IManyRelationsLoaderByUserIdService<
    ISelectBill,
    ITargetBillConsumer
> {
    constructor(private readonly queryBus: QueryBus) {}

    loadMany(_: string, sources: ISelectBill[]): Promise<ITargetBillConsumer[]> {
        return whenNotEmpty(sources, (sources) =>
            this.queryBus.execute<FindManyBillConsumerTargetsByRefIdsQuery, ITargetBillConsumer[]>(
                new FindManyBillConsumerTargetsByRefIdsQuery({
                    billIds: sources.map((source) => source.id),
                }),
            ),
        );
    }
}
