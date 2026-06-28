export class DeleteConsumerCommand {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
