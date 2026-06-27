export class FindReceiverListByUserIdQuery {
    constructor(
        public readonly userId: string,
        public readonly offset = 0,
        public readonly limit = 10,
    ) {}
}
