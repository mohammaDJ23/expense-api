interface IProps {
    emailId: string;
}

export class FindManyOauthAccountByEmailIdQuery {
    constructor(public readonly props: IProps) {}
}
