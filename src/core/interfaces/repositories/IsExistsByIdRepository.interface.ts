export interface IIsExistsByIdRepository {
    isExistsById(id: string): Promise<boolean>;
}
