interface IProps {
    userId: string;
}

export class FindManyBillsByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
