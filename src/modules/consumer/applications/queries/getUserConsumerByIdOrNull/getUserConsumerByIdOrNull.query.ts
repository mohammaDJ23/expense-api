export class GetUserConsumerByIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
