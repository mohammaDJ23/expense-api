import { Injectable } from '@nestjs/common';

import type { IQueryPipeline } from './queryPipeline.interface';
import type { CacheQueryPipelineService } from '@/core/features/cache/cacheQueryPipeline.service';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class QueryPipeline {
    constructor(private readonly cacheQueryPipelineService: CacheQueryPipelineService) {}

    execute<TInput extends TQuery = TQuery>(
        query: TInput,
        next: () => Promise<unknown>,
    ): Promise<unknown> {
        const pipelines: IQueryPipeline[] = [this.cacheQueryPipelineService];

        let nextFn = next;

        for (const pipeline of pipelines.toReversed()) {
            const currentNext = nextFn;

            nextFn = () => pipeline.use(query, currentNext);
        }

        return nextFn();
    }
}
