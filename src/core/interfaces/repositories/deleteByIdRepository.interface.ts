export interface IDeleteByIdRepository<TOutput> {
    deleteById(id: string): Promise<TOutput>;
}
