export interface IUpdateRepository<TInput, TOutput> {
    update(data: TInput): Promise<TOutput>;
}
