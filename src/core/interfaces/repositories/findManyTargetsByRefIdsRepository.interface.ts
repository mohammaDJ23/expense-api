export interface IFindManyTargetsByRefIdsRepository<TOutput> {
    findManyTargetsByRefIds(refIds: string[]): Promise<TOutput[]>;
}
