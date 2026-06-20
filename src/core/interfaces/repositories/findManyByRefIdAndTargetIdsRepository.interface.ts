export interface IFindManyByRefIdAndTargetIdsRepository<TOutput> {
    findManyByRefIdAndTargetIds(refId: string, targetIds: string[]): Promise<TOutput[]>;
}
