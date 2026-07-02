interface IProps {
    userId: string;
    id: string;
}

export class DeleteConsumerCommand {
    constructor(public readonly props: IProps) {}
}
