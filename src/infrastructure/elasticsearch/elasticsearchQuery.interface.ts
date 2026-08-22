export interface IElasticsearchQuery<TInput, TOutput> {
    buildQuery(input: TInput): TOutput;
}
