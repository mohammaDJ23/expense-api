import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyReceiversByUserIdAndIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.query';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class ReceiverSearchAggregateService implements IElasticsearchSearchAggregate<ISelectReceiver> {
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    aggregate(userId: string, ids: string[]): Promise<ISelectReceiver[]> {
        return whenNotEmpty(ids, (ids) =>
            this.queryDispatcher.execute<FindManyReceiversByUserIdAndIdsQuery, ISelectReceiver[]>(
                new FindManyReceiversByUserIdAndIdsQuery({
                    userId,
                    ids,
                }),
            ),
        );
    }
}
