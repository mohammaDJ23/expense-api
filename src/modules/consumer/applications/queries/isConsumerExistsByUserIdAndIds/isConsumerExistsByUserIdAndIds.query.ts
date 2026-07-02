interface IProps {
    userId: string;
    ids: string[];
}

export class IsConsumerExistsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
