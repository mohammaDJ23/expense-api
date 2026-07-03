interface IProps {
    userId: string;
    id: string;
}

export class ExistsLocationByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
