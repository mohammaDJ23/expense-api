interface IProps {
    userId: string;
    ids: string[];
}

export class FindManyReceiversByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
