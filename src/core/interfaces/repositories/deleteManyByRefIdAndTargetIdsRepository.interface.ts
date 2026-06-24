export interface IDeleteManyByRefIdAndTargetIdsRepository<TOutput> {
    deleteManyByRefIdAndTargetId(refId: string, targetIds: string[]): Promise<TOutput[]>;
}
