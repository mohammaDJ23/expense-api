export interface IIsExistsByRefIdAndTargetIdsRepository {
    isExistsByRefIdAndTargetIds(refId: string, targetIds: string[]): Promise<boolean>;
}
