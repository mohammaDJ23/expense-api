interface IProps {
    email: string;
}

export class FindUserByEmailOrNullQuery {
    constructor(public readonly props: IProps) {}
}
