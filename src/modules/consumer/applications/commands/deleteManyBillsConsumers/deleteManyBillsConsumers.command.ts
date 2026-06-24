export class DeleteManyBillsConsumersCommand {
    constructor(
        public readonly billId: string,
        public readonly consumerIds: string[],
    ) {}
}
