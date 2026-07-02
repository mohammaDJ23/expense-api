interface IProps {
    billIds: string[];
}

export class FindManyBillConsumerTargetsByRefIdsQuery {
    constructor(public readonly props: IProps) {}
}
