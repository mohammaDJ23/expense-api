import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

interface IProps {
    userId: string;
    start: string;
    end: string;
    clientTimezone: string;
}

@Cacheable<FindBillsTimelineByPurchasedAtQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillsTimelineByPurchasedAtQuery {
    constructor(public readonly props: IProps) {}
}
