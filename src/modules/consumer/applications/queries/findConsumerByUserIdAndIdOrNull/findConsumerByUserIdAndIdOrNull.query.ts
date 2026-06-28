export class FindConsumerByUserIdAndIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
