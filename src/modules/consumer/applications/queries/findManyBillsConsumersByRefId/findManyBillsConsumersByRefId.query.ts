interface IProps {
    billId: string;
}

export class FindManyBillsConsumersByRefIdQuery {
    constructor(public readonly props: IProps) {}
}
