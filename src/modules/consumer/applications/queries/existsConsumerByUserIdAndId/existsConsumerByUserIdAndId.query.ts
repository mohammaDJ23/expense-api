interface IProps {
    userId: string;
    id: string;
}

export class ExistsConsumerByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
