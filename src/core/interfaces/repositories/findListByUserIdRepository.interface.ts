export interface IFindListByUserIdRepository<TOutput, TCursor> {
    findListByUserId(userId: string, limit: number, cursor: TCursor | null): Promise<TOutput[]>;
}
