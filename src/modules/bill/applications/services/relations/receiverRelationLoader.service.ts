import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindReceiverByUserIdAndIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    bill: ISelectBill;
}

@Injectable()
export class ReceiverRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectReceiver
> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<ISelectReceiver> {
        return this.queryBus.execute<FindReceiverByUserIdAndIdOrThrowQuery, ISelectReceiver>(
            new FindReceiverByUserIdAndIdOrThrowQuery({
                userId: input.userId,
                id: input.bill.receiverId,
            }),
        );
    }
}
