interface IProps {
    userId: string;
    offset: number;
    limit: number;
}

export class FindBillListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
