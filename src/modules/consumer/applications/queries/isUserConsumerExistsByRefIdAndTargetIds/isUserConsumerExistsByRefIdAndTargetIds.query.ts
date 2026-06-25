export class IsUserConsumerExistsByRefIdAndTargetIdsQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerIds: string[],
    ) {}
}
