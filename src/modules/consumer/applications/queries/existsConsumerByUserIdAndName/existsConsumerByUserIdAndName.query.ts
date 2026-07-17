interface IProps {
    userId: string;
    name: string;
}

export class ExistsConsumerByUserIdAndNameQuery {
    constructor(public readonly props: IProps) {}
}
