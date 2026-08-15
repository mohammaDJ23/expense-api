import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { QueryPipeline } from './query.pipeline';

import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class QueryDispatcher {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly queryPipeline: QueryPipeline,
    ) {}

    execute<TInput extends TQuery = TQuery, TOutput = unknown>(query: TInput): Promise<TOutput> {
        return this.queryPipeline.execute<TInput>(query, () =>
            this.queryBus.execute<TInput, TOutput>(query),
        ) as Promise<TOutput>;
    }
}
