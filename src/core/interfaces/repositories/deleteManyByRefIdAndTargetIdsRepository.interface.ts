export interface IDeleteManyByRefIdAndTargetIdsRepository<TOutput> {
    deleteManyByRefIdAndTargetIds(refId: string, targetIds: string[]): Promise<TOutput[]>;
}
