export interface IFindListByUserIdRepository<TOptions, TOutput> {
    findListByUserId(userId: string, options: TOptions): Promise<TOutput[]>;
}
