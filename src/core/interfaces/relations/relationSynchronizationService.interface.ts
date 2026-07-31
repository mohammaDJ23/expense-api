export interface IRelationSynchronizationService<TInput, TOutput> {
    synchronize(input: TInput): Promise<TOutput>;
}
