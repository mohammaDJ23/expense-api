export class GetJoinedUserReceiverByIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
