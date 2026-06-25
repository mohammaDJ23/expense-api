export class IsUserConsumerExistsByRefIdAndTargetIdQuery {
    constructor(
        public readonly userId: string,
        public readonly consumerId: string,
    ) {}
}
