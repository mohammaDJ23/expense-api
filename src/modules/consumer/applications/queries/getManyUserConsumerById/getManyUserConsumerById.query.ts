export class GetManyUserConsumerByIdQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerIds: string[],
    ) {}
}
