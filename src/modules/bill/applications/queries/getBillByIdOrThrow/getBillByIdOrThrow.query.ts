export class GetBillByIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly billId: string,
    ) {}
}
