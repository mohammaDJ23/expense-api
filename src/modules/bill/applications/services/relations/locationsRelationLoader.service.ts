import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
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
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<ISelectLocation[]> {
        return whenNotEmpty(input.locationIds, (locationIds) =>
            this.queryBus.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                new FindManyLocationsByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: locationIds,
                }),
            ),
        );
    }
}
