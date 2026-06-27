export class DeleteReceiverCommand {
    constructor(
        public readonly userId: string,
        public readonly receiverId: string,
    ) {}
}
