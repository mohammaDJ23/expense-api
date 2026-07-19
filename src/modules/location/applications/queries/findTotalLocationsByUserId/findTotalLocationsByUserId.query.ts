interface IProps {
    userId: string;
}

export class FindTotalLocationsByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
