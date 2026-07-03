export interface IExistsByUserIdAndIdRepository {
    existsByUserIdAndId(userId: string, id: string): Promise<boolean>;
}
