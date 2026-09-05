import { Injectable } from '@nestjs/common';

import { QueryCachePipelineService } from '@/core/features/queryCache/queryCachePipeline.service';

import type { IQueryPipeline } from './queryPipeline.interface';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class QueryPipeline {
    constructor(private readonly queryCachePipelineService: QueryCachePipelineService) {}

    execute<TInput extends TQuery = TQuery>(
        query: TInput,
        next: () => Promise<unknown>,
    ): Promise<unknown> {
        const pipelines: IQueryPipeline[] = [this.queryCachePipelineService];

        let nextFn = next;

        for (const pipeline of pipelines.toReversed()) {
            const currentNext = nextFn;

            nextFn = () => pipeline.use(query, currentNext);
        }

        return nextFn();
    }
}
