interface IProps {
    emailId: string;
}

export class FindLocalAccountByEmailIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
