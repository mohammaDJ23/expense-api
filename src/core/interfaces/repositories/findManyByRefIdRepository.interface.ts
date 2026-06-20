export interface IFindManyByRefIdRepository<TOutput> {
    findManyByRefId(refId: string): Promise<TOutput[]>;
}
