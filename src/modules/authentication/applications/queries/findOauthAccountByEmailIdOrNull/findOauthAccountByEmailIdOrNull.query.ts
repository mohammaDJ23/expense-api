interface IProps {
    emailId: string;
}

export class FindOauthAccountByEmailIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
