export class FindManyReceiversByUserIdAndIdsQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverIds: string[],
    ) {}
}
