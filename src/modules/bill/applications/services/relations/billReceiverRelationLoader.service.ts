import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyReceiversByUserIdAndIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.query';
import { FindReceiverByUserIdAndIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.query';

import type { IManyRelationsLoaderByUserIdService } from '@/core/interfaces/relationLoaders/manyRelationsLoaderByUserIdService.interface';
import type { IOneRelationLoaderByUserIdService } from '@/core/interfaces/relationLoaders/oneRelationLoaderByUserIdService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class BillReceiverRelationLoaderService
    implements
        IOneRelationLoaderByUserIdService<ISelectBill, ISelectReceiver>,
        IManyRelationsLoaderByUserIdService<ISelectBill, ISelectReceiver>
{
    constructor(private readonly queryBus: QueryBus) {}

    loadOne(userId: string, source: ISelectBill): Promise<ISelectReceiver> {
        return this.queryBus.execute<FindReceiverByUserIdAndIdOrThrowQuery, ISelectReceiver>(
            new FindReceiverByUserIdAndIdOrThrowQuery({
                userId,
                id: source.receiverId,
            }),
        );
    }

    loadMany(userId: string, sources: ISelectBill[]): Promise<ISelectReceiver[]> {
        return whenNotEmpty(sources, (sources) =>
            this.queryBus.execute<FindManyReceiversByUserIdAndIdsQuery, ISelectReceiver[]>(
                new FindManyReceiversByUserIdAndIdsQuery({
                    userId,
                    ids: sources.map((source) => source.receiverId),
                }),
            ),
        );
    }
}
