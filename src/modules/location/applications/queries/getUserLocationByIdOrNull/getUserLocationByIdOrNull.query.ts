export class GetUserLocationByIdOrNullQuery {
    constructor(
        public readonly userId: string,
        public readonly locationId: string,
    ) {}
}
