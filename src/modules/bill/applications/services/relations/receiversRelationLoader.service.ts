import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyReceiversByUserIdAndIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    bills: ISelectBill[];
}

@Injectable()
export class ReceiversRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectReceiver[]
> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<ISelectReceiver[]> {
        return whenNotEmpty(input.bills, (bills) =>
            this.queryBus.execute<FindManyReceiversByUserIdAndIdsQuery, ISelectReceiver[]>(
                new FindManyReceiversByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: bills.map((bill) => bill.receiverId),
                }),
            ),
        );
    }
}
