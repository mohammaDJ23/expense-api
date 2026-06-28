export class IsConsumerExistsByUserIdAndIdQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
