import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/bill.enum';

interface IProps {
    billId: string;
    userId: string;
}

@Cacheable<FindManyBillsConsumersByRefIdQuery>({
    namespace: BillResource.BILL_CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyBillsConsumersByRefIdQuery {
    constructor(public readonly props: IProps) {}
}
