export interface IFindTargetByRefIdAndTargetIdRepository<TOutput> {
    findTargetByRefIdAndTargetId(refId: string, targetId: string): Promise<TOutput>;
}
