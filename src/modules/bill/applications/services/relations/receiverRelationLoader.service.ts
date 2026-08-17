import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindReceiverByUserIdAndIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
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
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    load(input: IInput): Promise<ISelectReceiver> {
        return this.queryDispatcher.execute<FindReceiverByUserIdAndIdOrThrowQuery, ISelectReceiver>(
            new FindReceiverByUserIdAndIdOrThrowQuery({
                userId: input.userId,
                id: input.bill.receiverId,
            }),
        );
    }
}
