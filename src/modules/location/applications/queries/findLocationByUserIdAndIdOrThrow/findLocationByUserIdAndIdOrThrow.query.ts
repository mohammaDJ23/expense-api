export class FindLocationByUserIdAndIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly locationId: string,
    ) {}
}
