interface IProps {
    userId: string;
    start: string;
    end: string;
    clientTimezone: string;
}

export class FindBillsTimelineByPurchasedAtQuery {
    constructor(public readonly props: IProps) {}
}
