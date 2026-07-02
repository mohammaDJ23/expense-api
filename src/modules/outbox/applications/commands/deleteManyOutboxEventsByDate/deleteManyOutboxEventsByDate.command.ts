interface IProps {
    date: string;
}

export class DeleteManyOutboxEventsByDateCommand {
    constructor(public readonly props: IProps) {}
}
