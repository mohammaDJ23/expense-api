export class GetReceiverByIdAndUserIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
