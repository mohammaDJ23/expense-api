import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindUserIdListElasticsearchQuery } from '@/modules/search/infrastructure/elasticsearch/findUserIdListElasticsearch.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    size: number;
    after: estypes.AggregationsCompositeAggregateKey | null;
}

interface IUserIdAggregation {
    userIds: estypes.AggregationsCompositeAggregate;
}

@Injectable()
export class FindUserIdListElasticsearchService implements IService<
    IInput,
    IListResult<string, estypes.AggregationsCompositeAggregateKey>
> {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly findUserIdListElasticsearchQuery: FindUserIdListElasticsearchQuery,
    ) {}

    async execute(
        input: IInput,
    ): Promise<IListResult<string, estypes.AggregationsCompositeAggregateKey>> {
        try {
            const response = await this.elasticsearchService.search<unknown, IUserIdAggregation>(
                this.findUserIdListElasticsearchQuery.buildQuery(input),
            );

            const aggregation = response.aggregations?.userIds;

            if (!aggregation) {
                return {
                    items: [],
                    hasNextPage: false,
                    nextCursor: null,
                };
            }

            const buckets = Array.isArray(aggregation.buckets) ? aggregation.buckets : [];
            const nextCursor = aggregation.after_key ?? null;

            return {
                items: buckets.map((bucket) => String(bucket.key.userId)),
                nextCursor,
                hasNextPage: nextCursor !== null,
            };
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
