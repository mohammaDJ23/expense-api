interface IProps {
    userId: string;
    id: string;
}

export class IsBillExistsByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
