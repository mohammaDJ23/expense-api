export class DeleteBillCommand {
    constructor(
        public readonly userId: string,
        public readonly billId: string,
    ) {}
}
