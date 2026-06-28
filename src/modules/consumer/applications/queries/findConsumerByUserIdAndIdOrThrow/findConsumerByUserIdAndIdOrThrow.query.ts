export class FindConsumerByUserIdAndIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
