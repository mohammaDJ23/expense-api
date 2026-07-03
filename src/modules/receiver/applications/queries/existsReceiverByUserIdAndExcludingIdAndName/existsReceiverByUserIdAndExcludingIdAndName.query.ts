interface IProps {
    userId: string;
    excludingId: string;
    name: string;
}

export class ExistsReceiverByUserIdAndExcludingIdAndNameQuery {
    constructor(public readonly props: IProps) {}
}
