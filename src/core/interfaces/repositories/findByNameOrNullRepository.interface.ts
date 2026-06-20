export interface IFindByNameOrNullRepository<TOutput> {
    findByNameOrNull(name: string): Promise<TOutput | null>;
}
