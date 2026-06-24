export interface IFindManyByRefIdRepository<TOutput> {
    findManyByRefId(ids: string): Promise<TOutput[]>;
}
