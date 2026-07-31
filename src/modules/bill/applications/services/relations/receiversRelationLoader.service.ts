import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

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
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<ISelectReceiver[]> {
        return whenNotEmpty(input.receiverIds, (receiverIds) =>
            this.queryBus.execute<FindManyReceiversByUserIdAndIdsQuery, ISelectReceiver[]>(
                new FindManyReceiversByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: receiverIds,
                }),
            ),
        );
    }
}
