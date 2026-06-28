export class IsBillExistsByUserIdAndIdQuery {
    constructor(
        public readonly userId: string,
        public readonly billId: string,
    ) {}
}
