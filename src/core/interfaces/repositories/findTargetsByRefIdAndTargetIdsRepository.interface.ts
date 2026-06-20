export interface IFindTargetsByRefIdAndTargetIdsRepository<TOutput> {
    findTargetsByRefIdAndTargetIds(refId: string, targetIds: string[]): Promise<TOutput[]>;
}
