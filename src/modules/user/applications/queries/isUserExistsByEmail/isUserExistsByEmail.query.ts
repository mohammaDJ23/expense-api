interface IProps {
    email: string;
}

export class IsUserExistsByEmailQuery {
    constructor(public readonly props: IProps) {}
}
