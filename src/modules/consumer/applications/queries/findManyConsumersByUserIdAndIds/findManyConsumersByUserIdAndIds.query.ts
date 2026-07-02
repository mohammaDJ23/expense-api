interface IProps {
    userId: string;
    ids: string[];
}

export class FindManyConsumersByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
