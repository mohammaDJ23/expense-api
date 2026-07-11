interface IProps {
    userId: string;
    ids: string[];
}

export class FindManyBillsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
