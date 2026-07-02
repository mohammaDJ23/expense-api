interface IProps {
    userId: string;
    name: string;
}

export class FindLocationByUserIdAndNameOrNullQuery {
    constructor(public readonly props: IProps) {}
}
