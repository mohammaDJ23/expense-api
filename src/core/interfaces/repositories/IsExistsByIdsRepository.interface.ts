export interface IIsExistsByIdsRepository {
    isExistsByIds(ids: string[]): Promise<boolean>;
}
