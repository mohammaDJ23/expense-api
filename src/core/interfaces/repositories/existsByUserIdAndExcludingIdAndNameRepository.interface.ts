export interface IExistsByUserIdAndExcludingIdAndNameRepository {
    existsByUserIdAndExcludingIdAndName(
        userId: string,
        excludingId: string,
        name: string,
    ): Promise<boolean>;
}
