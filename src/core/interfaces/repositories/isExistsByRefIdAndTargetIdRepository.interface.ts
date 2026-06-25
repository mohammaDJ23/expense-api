export interface IIsExistsByRefIdAndTargetIdRepository {
    isExistsByRefIdAndTargetId(refId: string, targetId: string): Promise<boolean>;
}
