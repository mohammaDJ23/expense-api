export class IsUserReceiverExistsByRefIdAndTargetIdQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
