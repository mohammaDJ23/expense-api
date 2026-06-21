export interface IFindTargetByRefIdAndTargetIdOrThrowRepository<TOutput> {
    findTargetByRefIdAndTargetIdOrThrow(refId: string, targetId: string): Promise<TOutput>;
}
