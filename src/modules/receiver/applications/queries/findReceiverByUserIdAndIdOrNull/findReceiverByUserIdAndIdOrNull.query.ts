export class FindReceiverByUserIdAndIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
