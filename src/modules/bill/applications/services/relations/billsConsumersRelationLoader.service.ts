import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindManyBillsConsumersByRefIdQuery } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

interface IInput {
    billId: string;
    userId: string;
}

@Injectable()
export class BillsConsumersRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectBillConsumer[]
> {
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    load(input: IInput): Promise<ISelectBillConsumer[]> {
        return this.queryDispatcher.execute<
            FindManyBillsConsumersByRefIdQuery,
            ISelectBillConsumer[]
        >(
            new FindManyBillsConsumersByRefIdQuery({
                billId: input.billId,
                userId: input.userId,
            }),
        );
    }
}
