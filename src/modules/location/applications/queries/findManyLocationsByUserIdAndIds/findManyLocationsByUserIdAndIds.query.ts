export class FindManyLocationsByUserIdAndIdsQuery {
    constructor(
        public readonly userId: string,
        public readonly locationIds: string[],
    ) {}
}
