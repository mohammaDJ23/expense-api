interface IProps {
    id: string;
}

export class ExistsUserByIdQuery {
    constructor(public readonly props: IProps) {}
}
