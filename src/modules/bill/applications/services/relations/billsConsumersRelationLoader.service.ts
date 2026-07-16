import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyBillsConsumersByRefIdQuery } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

interface IInput {
    billId: string;
}

type TOutput = ISelectBillConsumer[];

@Injectable()
export class BillsConsumersRelationLoaderService implements IRelationLoaderService<
    IInput,
    TOutput
> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<TOutput> {
        return this.queryBus.execute<FindManyBillsConsumersByRefIdQuery, ISelectBillConsumer[]>(
            new FindManyBillsConsumersByRefIdQuery({
                billId: input.billId,
            }),
        );
    }
}
