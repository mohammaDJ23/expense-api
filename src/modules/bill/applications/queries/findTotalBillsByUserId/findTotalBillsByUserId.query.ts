interface IProps {
    userId: string;
}

export class FindTotalBillsByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
