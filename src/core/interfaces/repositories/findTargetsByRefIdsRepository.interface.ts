export interface IFindTargetsByRefIdsRepository<TOutput> {
    findTargetsByRefIds(refIds: string[]): Promise<TOutput[]>;
}
