export interface IFindByRefIdAndTargetIdRepository<TOutput> {
    findByRefIdAndTargetId(refId: string, targetId: string): Promise<TOutput>;
}
