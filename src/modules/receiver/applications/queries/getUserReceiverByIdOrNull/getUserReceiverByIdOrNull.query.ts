export class GetUserReceiverByIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
