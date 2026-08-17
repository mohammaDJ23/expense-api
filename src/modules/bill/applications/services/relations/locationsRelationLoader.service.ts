import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    locationIds: string[];
}

@Injectable()
export class LocationsRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectLocation[]
> {
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    load(input: IInput): Promise<ISelectLocation[]> {
        return whenNotEmpty(input.locationIds, (locationIds) =>
            this.queryDispatcher.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                new FindManyLocationsByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: locationIds,
                }),
            ),
        );
    }
}
