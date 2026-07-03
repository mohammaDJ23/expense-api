interface IProps {
    userId: string;
    excludingId: string;
    name: string;
}

export class ExistsConsumerByUserIdAndExcludingIdAndNameQuery {
    constructor(public readonly props: IProps) {}
}
