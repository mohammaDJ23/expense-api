export class FindUserConsumerByRefIdAndTargetIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
