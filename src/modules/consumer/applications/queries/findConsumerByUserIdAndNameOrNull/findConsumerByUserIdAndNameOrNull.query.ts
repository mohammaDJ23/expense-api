interface IProps {
    userId: string;
    name: string;
}

export class FindConsumerByUserIdAndNameOrNullQuery {
    constructor(public readonly props: IProps) {}
}
