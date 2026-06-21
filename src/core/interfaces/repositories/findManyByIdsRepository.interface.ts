export interface IFindManyByIdsRepository<TOutput> {
    findManyByIds(ids: string[]): Promise<TOutput[]>;
}
