interface IProps {
    userId: string;
    id: string;
}

export class FindConsumerByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
