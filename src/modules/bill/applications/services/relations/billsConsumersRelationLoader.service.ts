import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyBillsConsumersByRefIdQuery } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

interface IInput {
    billId: string;
}

@Injectable()
export class BillsConsumersRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectBillConsumer[]
> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<ISelectBillConsumer[]> {
        return this.queryBus.execute<FindManyBillsConsumersByRefIdQuery, ISelectBillConsumer[]>(
            new FindManyBillsConsumersByRefIdQuery({
                billId: input.billId,
            }),
        );
    }
}
