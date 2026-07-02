interface IProps {
    id: string;
}

export class FindUserByIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
