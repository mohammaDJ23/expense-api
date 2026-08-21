export interface IFindListRepository<TOutput, TCursor> {
    findList(limit: number, cursor: TCursor | null): Promise<TOutput[]>;
}
