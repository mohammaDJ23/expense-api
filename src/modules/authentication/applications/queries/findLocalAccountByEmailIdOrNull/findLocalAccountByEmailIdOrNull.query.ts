interface IProps {
    emailId: string;
}

export class FindLocalAccountByEmailIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
