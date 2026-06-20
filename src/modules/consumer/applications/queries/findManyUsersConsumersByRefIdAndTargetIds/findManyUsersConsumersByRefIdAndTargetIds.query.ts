export class FindManyUsersConsumersByRefIdAndTargetIdsQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerIds: string[],
    ) {}
}
