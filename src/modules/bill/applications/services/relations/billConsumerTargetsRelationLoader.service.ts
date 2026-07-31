import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

interface IInput {
    billIds: string[];
}

@Injectable()
export class BillConsumerTargetsRelationLoaderService implements IRelationLoaderService<
    IInput,
    ITargetBillConsumer[]
> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<ITargetBillConsumer[]> {
        return whenNotEmpty(input.billIds, (billIds) =>
            this.queryBus.execute<FindManyBillConsumerTargetsByRefIdsQuery, ITargetBillConsumer[]>(
                new FindManyBillConsumerTargetsByRefIdsQuery({
                    billIds,
                }),
            ),
        );
    }
}
