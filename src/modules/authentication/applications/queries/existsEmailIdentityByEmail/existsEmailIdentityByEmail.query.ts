interface IProps {
    email: string;
}

export class ExistsEmailIdentityByEmailQuery {
    constructor(public readonly props: IProps) {}
}
