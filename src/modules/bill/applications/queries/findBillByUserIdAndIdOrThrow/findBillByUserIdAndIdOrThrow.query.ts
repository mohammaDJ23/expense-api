interface IProps {
    userId: string;
    id: string;
}

export class FindBillByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
