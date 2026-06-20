export interface IFindByRefIdAndTargetIdOrNullRepository<TOutput> {
    findByRefIdAndTargetIdOrNull(refId: string, targetId: string): Promise<TOutput | null>;
}
