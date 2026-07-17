export interface IExistsByUserIdAndNameRepository {
    existsByUserIdAndName(userId: string, name: string): Promise<boolean>;
}
