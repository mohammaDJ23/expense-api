export class GetManyJoinedUsersLocationsByIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly locationIds: string[],
    ) {}
}
