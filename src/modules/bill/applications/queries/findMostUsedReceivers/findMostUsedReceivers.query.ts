interface IProps {
    userId: string;
    limit: number;
}

export class FindMostUsedReceiversQuery {
    constructor(public readonly props: IProps) {}
}
