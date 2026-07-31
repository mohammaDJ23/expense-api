export interface IRelationLoaderService<TInput, TOutput> {
    load(input: TInput): Promise<TOutput>;
}
