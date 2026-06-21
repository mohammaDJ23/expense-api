export class FindBillByUserIdAndIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly billId: string,
    ) {}
}
