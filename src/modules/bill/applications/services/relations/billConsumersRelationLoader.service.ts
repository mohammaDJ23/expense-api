import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

type TInput = ISelectBill[];

type TOutput = ITargetBillConsumer[];

@Injectable()
export class BillConsumersRelationLoaderService implements IRelationLoaderService<TInput, TOutput> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: TInput): Promise<TOutput> {
        return whenNotEmpty(input, (input) =>
            this.queryBus.execute<FindManyBillConsumerTargetsByRefIdsQuery, ITargetBillConsumer[]>(
                new FindManyBillConsumerTargetsByRefIdsQuery({
                    billIds: input.map((bill) => bill.id),
                }),
            ),
        );
    }
}
