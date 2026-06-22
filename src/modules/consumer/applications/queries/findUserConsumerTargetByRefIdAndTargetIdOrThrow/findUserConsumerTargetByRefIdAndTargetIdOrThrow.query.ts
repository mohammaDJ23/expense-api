export class FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
