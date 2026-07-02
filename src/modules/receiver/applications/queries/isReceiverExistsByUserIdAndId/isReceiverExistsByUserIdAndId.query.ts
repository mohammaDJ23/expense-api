interface IProps {
    userId: string;
    id: string;
}

export class IsReceiverExistsByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
