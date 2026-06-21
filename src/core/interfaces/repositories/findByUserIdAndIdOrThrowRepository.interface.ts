export interface IFindByUserIdAndIdOrThrowRepository<TOutput> {
    findByUserIdAndIdOrThrow(userId: string, id: string): Promise<TOutput>;
}
