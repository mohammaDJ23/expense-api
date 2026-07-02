interface IProps {
    userId: string;
    id: string;
}

export class FindLocationByUserIdAndIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
