interface IProps {
    userId: string;
}

export class FindTotalConsumersByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
