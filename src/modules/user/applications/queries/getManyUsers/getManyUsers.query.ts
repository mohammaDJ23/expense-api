export class GetManyUsersQuery {
    constructor(
        public readonly offset = 0,
        public readonly limit = 10,
    ) {}
}
