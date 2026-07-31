interface IProps {
    userId: string;
    offset: number;
    limit: number;
}

export class FindConsumerListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
