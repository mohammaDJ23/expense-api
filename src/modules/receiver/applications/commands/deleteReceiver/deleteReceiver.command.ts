interface IProps {
    userId: string;
    id: string;
}

export class DeleteReceiverCommand {
    constructor(public readonly props: IProps) {}
}
