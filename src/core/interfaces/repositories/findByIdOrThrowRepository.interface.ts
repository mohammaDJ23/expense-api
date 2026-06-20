export interface IFindByIdOrThrowRepository<TOutput> {
    findByIdOrThrow(id: string): Promise<TOutput>;
}
