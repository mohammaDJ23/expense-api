export interface IFindByUserIdOrThrowRepository<TOutput> {
    findByUserIdOrThrow(userId: string): Promise<TOutput>;
}
