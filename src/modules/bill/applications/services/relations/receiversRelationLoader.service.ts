import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyReceiversByUserIdAndIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    receiverIds: string[];
}

@Injectable()
export class ReceiversRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectReceiver[]
> {
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    load(input: IInput): Promise<ISelectReceiver[]> {
        return whenNotEmpty(input.receiverIds, (receiverIds) =>
            this.queryDispatcher.execute<FindManyReceiversByUserIdAndIdsQuery, ISelectReceiver[]>(
                new FindManyReceiversByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: receiverIds,
                }),
            ),
        );
    }
}
