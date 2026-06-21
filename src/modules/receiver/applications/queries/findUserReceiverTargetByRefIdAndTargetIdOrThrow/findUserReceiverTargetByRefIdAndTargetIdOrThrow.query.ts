export class FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
