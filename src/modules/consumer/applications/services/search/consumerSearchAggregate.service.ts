import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyConsumersByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/findManyConsumersByUserIdAndIds/findManyConsumersByUserIdAndIds.query';

import type { IElasticsearchSearchAggregate } from '@/infrastructure/elasticsearch/elasticsearchSearchAggregate.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class ConsumerSearchAggregateService implements IElasticsearchSearchAggregate<ISelectConsumer> {
    constructor(private readonly queryBus: QueryBus) {}

    aggregate(userId: string, ids: string[]): Promise<ISelectConsumer[]> {
        return whenNotEmpty(ids, (ids) =>
            this.queryBus.execute<FindManyConsumersByUserIdAndIdsQuery, ISelectConsumer[]>(
                new FindManyConsumersByUserIdAndIdsQuery({
                    userId,
                    ids,
                }),
            ),
        );
    }
}
