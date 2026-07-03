export interface IExistsByIdRepository {
    existsById(id: string): Promise<boolean>;
}
