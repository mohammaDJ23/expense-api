import type { TQuery } from '@/infrastructure/cqrs/query.type';

export interface IQueryPipeline<TOutput = unknown> {
    use(query: TQuery, next: () => Promise<TOutput>): Promise<TOutput>;
}
