export class GetManyJoinedBillsConsumersByIdQuery {
    constructor(
        public readonly billId: string,
        public readonly consumerIds: string[],
    ) {}
}
