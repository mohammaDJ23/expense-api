interface IProps {
    email: string;
}

export class FindEmailIdentityByEmailOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
