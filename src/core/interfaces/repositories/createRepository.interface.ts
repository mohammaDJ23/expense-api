export interface ICreateRepository<TInput, TOutput> {
    create(data: TInput): Promise<TOutput>;
}
