export interface IDeleteByUserIdAndIdRepository<TOutput> {
    deleteByUserIdAndId(userId: string, id: string): Promise<TOutput>;
}
