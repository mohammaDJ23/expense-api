export interface IFindByIdOrNullRepository<TOutput> {
    findByIdOrNull(id: string): Promise<TOutput | null>;
}
