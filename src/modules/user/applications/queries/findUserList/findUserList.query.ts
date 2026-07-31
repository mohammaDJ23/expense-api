interface IProps {
    offset: number;
    limit: number;
}

export class FindUserListQuery {
    constructor(public readonly props: IProps) {}
}
