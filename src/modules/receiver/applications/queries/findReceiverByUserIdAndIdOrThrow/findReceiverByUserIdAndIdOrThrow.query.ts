export class FindReceiverByUserIdAndIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
