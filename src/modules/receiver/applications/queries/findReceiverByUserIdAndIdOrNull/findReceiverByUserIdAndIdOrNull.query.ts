interface IProps {
    userId: string;
    id: string;
}

export class FindReceiverByUserIdAndIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
