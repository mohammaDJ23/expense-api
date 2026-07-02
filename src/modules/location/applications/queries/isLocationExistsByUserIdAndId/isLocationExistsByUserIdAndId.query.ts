interface IProps {
    userId: string;
    id: string;
}

export class IsLocationExistsByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
