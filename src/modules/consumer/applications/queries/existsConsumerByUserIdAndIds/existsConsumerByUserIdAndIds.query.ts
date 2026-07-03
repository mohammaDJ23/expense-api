interface IProps {
    userId: string;
    ids: string[];
}

export class ExistsConsumerByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
