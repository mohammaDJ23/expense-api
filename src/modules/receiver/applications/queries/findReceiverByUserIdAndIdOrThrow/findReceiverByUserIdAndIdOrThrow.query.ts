interface IProps {
    userId: string;
    id: string;
}

export class FindReceiverByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
