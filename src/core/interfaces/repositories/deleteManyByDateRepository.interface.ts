export interface IDeleteManyByDateRepository<TOutput> {
    deleteManyByDate(date: string): Promise<TOutput[]>;
}
