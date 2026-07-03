interface IProps {
    userId: string;
    excludingId: string;
    name: string;
}

export class ExistsLocationByUserIdAndExcludingIdAndNameQuery {
    constructor(public readonly props: IProps) {}
}
