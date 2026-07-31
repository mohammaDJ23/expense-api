interface IProps {
    userId: string;
    offset: number;
    limit: number;
}

export class FindLocationListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
