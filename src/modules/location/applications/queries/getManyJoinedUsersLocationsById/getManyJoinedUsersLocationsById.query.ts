export class GetManyJoinedUsersLocationsByIdQuery {
    constructor(
        public readonly userId: string,
        public readonly locationIds: string[],
    ) {}
}
