import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindUserIdListElasticsearchQuery } from '@/modules/search/infrastructure/elasticsearch/findUserIdListElasticsearch.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    size: number;
    after: estypes.AggregationsCompositeAggregateKey | null;
}

interface IOutput {
    userIds: string[];
    after: estypes.AggregationsCompositeAggregateKey | null;
}

interface IUserIdAggregation {
    userIds: estypes.AggregationsCompositeAggregate;
}

@Injectable()
export class FindUserIdListElasticsearchService implements IService<IInput, IOutput> {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly findUserIdListElasticsearchQuery: FindUserIdListElasticsearchQuery,
    ) {}

    async execute(input: IInput): Promise<IOutput> {
        try {
            const response = await this.elasticsearchService.search<unknown, IUserIdAggregation>(
                this.findUserIdListElasticsearchQuery.buildQuery(input),
            );

            const aggregation = response.aggregations?.userIds;

            if (!aggregation) {
                return {
                    userIds: [],
                    after: null,
                };
            }

            const buckets = Array.isArray(aggregation.buckets) ? aggregation.buckets : [];

            return {
                userIds: buckets.map((bucket) => String(bucket.key.userId)),
                after: aggregation.after_key ?? null,
            };
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
