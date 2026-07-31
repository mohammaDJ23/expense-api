interface IProps {
    userId: string;
    offset: number;
    limit: number;
}

export class FindReceiverListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
