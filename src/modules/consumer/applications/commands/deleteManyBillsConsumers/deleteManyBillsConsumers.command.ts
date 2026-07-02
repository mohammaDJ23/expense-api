interface IProps {
    billId: string;
    ids: string[];
}

export class DeleteManyBillsConsumersCommand {
    constructor(public readonly props: IProps) {}
}
