interface IProps {
    userId: string;
    id: string;
}

export class ExistsReceiverByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
