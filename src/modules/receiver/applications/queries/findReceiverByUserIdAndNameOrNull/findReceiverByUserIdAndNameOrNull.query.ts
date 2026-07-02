interface IProps {
    userId: string;
    name: string;
}

export class FindReceiverByUserIdAndNameOrNullQuery {
    constructor(public readonly props: IProps) {}
}
