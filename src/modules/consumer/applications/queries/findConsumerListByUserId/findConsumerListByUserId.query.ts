export class FindConsumerListByUserIdQuery {
    constructor(
        public readonly userId: string,
        public readonly offset = 0,
        public readonly limit = 10,
    ) {}
}
