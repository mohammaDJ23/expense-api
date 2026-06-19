export class GetManyJoinedUsersReceiversByIdQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverIds: string[],
    ) {}
}
