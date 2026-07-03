interface IProps {
    userId: string;
    id: string;
}

export class ExistsBillByUserIdAndIdQuery {
    constructor(public readonly props: IProps) {}
}
