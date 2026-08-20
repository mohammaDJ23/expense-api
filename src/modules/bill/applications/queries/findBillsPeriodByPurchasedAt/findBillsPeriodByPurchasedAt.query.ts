import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/bill.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindBillsPeriodByPurchasedAtQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillsPeriodByPurchasedAtQuery {
    constructor(public readonly props: IProps) {}
}
