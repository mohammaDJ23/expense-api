export interface IFindManyByUserIdAndIdsRepository<TOutput> {
    findManyByUserIdAndIds(userId: string, ids: string[]): Promise<TOutput[]>;
}
