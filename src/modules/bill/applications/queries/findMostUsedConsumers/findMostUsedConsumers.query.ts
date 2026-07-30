interface IProps {
    userId: string;
    limit: number;
}

export class FindMostUsedConsumersQuery {
    constructor(public readonly props: IProps) {}
}
