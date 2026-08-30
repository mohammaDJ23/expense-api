export interface IFindManyByUserIdsRepository<TOutput> {
    findManyByUserIds(userIds: string[]): Promise<TOutput[]>;
}
