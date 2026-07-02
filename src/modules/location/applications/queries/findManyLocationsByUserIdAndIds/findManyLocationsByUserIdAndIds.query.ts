interface IProps {
    userId: string;
    ids: string[];
}

export class FindManyLocationsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
