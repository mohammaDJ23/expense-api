export class GetManyJoinedUsersReceiversByIdOrThrowQuery {
    constructor(
        public readonly userId: string,
        public readonly receiverIds: string[],
    ) {}
}
