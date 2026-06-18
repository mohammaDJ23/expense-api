export class GetJoinedUserLocationByIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly locationId: string,
    ) {}
}
