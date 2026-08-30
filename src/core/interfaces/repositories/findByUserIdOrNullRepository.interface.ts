export interface IFindByUserIdOrNullRepository<TOutput> {
    findByUserIdOrNull(userId: string): Promise<TOutput | null>;
}
