export interface IExistsByUserIdAndIdsRepository {
    existsByUserIdAndIds(userId: string, ids: string[]): Promise<boolean>;
}
