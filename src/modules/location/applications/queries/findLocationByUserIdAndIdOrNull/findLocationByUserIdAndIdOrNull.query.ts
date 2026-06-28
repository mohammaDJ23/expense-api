export class FindLocationByUserIdAndIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly locationId: string,
    ) {}
}
