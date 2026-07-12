export interface IElasticsearchSearchAggregate<TOutput> {
    aggregate(userId: string, ids: string[]): Promise<TOutput[]>;
}
