export interface IIsExistsByUserIdAndIdsRepository {
    isExistsByUserIdAndIds(userId: string, ids: string[]): Promise<boolean>;
}
