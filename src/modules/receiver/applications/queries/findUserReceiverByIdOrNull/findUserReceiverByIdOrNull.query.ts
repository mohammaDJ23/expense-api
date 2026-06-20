export class FindUserReceiverByIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
