export class FindUserReceiverByRefIdAndTargetIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
