export interface IFindTargetsByRefIdRepository<TOutput> {
    findTargetsByRefId(refId: string): Promise<TOutput[]>;
}
