export interface IIsExistsByUserIdAndIdRepository {
    isExistsByUserIdAndId(userId: string, id: string): Promise<boolean>;
}
