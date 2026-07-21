interface IProps {
    userId: string;
}

export class FindTotalReceiversByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
