export interface IFindByUserIdAndNameOrNullRepository<TOutput> {
    findByUserIdAndNameOrNull(userId: string, name: string): Promise<TOutput | null>;
}
