interface IProps {
    userId: string;
    name: string;
}

export class ExistsLocationByUserIdAndNameQuery {
    constructor(public readonly props: IProps) {}
}
