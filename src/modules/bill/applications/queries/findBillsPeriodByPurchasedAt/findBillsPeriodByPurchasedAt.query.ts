import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

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
