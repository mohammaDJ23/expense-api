interface IProps {
    userId: string;
    name: string;
}

export class ExistsReceiverByUserIdAndNameQuery {
    constructor(public readonly props: IProps) {}
}
