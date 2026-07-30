interface IProps {
    userId: string;
    limit: number;
}

export class FindMostUsedLocationsQuery {
    constructor(public readonly props: IProps) {}
}
