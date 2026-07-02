interface IProps {
    userId: string;
    id: string;
}

export class IsConsumerExistsByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
