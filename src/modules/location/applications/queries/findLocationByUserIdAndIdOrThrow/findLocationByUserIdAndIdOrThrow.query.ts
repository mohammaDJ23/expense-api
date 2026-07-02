interface IProps {
    userId: string;
    id: string;
}

export class FindLocationByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
