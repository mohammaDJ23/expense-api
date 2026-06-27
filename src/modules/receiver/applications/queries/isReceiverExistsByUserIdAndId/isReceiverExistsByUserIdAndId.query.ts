export class IsReceiverExistsByUserIdAndIdQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
