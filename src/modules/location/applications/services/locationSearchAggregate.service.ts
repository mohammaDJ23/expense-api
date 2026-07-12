import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class LocationSearchAggregateService implements IElasticsearchSearchAggregate<ISelectLocation> {
    constructor(private readonly queryBus: QueryBus) {}

    aggregate(userId: string, ids: string[]): Promise<ISelectLocation[]> {
        return whenNotEmpty(ids, (ids) =>
            this.queryBus.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                new FindManyLocationsByUserIdAndIdsQuery({
                    userId,
                    ids,
                }),
            ),
        );
    }
}
