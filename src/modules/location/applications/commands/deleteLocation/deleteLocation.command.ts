interface IProps {
    userId: string;
    id: string;
}

export class DeleteLocationCommand {
    constructor(public readonly props: IProps) {}
}
