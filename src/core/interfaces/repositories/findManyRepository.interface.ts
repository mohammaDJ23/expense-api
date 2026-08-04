export interface IFindManyRepository<TOutput> {
    findMany(): Promise<TOutput[]>;
}
