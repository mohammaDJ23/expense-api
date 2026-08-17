import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class LocationSearchAggregateService implements IElasticsearchSearchAggregate<ISelectLocation> {
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    aggregate(userId: string, ids: string[]): Promise<ISelectLocation[]> {
        return whenNotEmpty(ids, (ids) =>
            this.queryDispatcher.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                new FindManyLocationsByUserIdAndIdsQuery({
                    userId,
                    ids,
                }),
            ),
        );
    }
}
