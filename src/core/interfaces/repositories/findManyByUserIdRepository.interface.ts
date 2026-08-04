export interface IFindManyByUserIdRepository<TOutput> {
    findManyByUserId(userId: string): Promise<TOutput[]>;
}
