export class IsConsumerExistsByUserIdAndIdsQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerIds: string[],
    ) {}
}
