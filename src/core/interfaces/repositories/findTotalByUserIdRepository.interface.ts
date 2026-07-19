export interface IFindTotalByUserIdRepository {
    findTotalByUserId(userId: string): Promise<number>;
}
