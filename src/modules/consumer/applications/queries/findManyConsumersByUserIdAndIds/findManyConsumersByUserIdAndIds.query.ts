export class FindManyConsumersByUserIdAndIdsQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerIds: string[],
    ) {}
}
