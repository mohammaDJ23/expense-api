export interface IFindByUserIdAndIdOrNullRepository<TOutput> {
    findByUserIdAndIdOrNull(userId: string, id: string): Promise<TOutput | null>;
}
