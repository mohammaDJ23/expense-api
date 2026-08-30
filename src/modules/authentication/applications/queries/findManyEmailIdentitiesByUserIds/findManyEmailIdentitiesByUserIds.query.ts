interface IProps {
    userIds: string[];
}

export class FindManyEmailIdentitiesByUserIdsQuery {
    constructor(public readonly props: IProps) {}
}
