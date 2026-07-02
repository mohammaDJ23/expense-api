interface IProps {
    userId: string;
}

export class DeleteUserCommand {
    constructor(public readonly props: IProps) {}
}
