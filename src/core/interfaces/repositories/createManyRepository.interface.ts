export interface ICreateManyRepository<TInput, TOutput> {
    createMany(data: TInput[]): Promise<TOutput[]>;
}
