export interface IIsExistsByRefIdAndTargetIdsRepository {
    isExistsByRefIdAndTargetId(refId: string, targetIds: string[]): Promise<boolean>;
}
