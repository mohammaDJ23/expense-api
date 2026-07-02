interface IProps {
    userId: string;
    id: string;
}

export class DeleteBillCommand {
    constructor(public readonly props: IProps) {}
}
