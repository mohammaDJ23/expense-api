interface IProps {
    email: string;
}

export class ExistsUserByEmailQuery {
    constructor(public readonly props: IProps) {}
}
