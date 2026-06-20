export interface IFindManyByNamesRepository<TOutput> {
    findManyByNames(names: string[]): Promise<TOutput[]>;
}
