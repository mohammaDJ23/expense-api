interface IProps {
    userId: string;
    id: string;
}

export class FindConsumerByUserIdAndIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
