export interface IFindListRepository<TInput, TOutput> {
    findList(options: TInput): Promise<TOutput[]>;
}
