interface IProps {
    emailId: string;
}

export class FindLocalAccountByEmailIdQuery {
    constructor(public readonly props: IProps) {}
}
