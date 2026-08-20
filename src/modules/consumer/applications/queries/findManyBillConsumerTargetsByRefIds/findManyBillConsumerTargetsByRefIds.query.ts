import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/bill.enum';

interface IProps {
    billIds: string[];
    userId: string;
}

@Cacheable<FindManyBillConsumerTargetsByRefIdsQuery>({
    namespace: BillResource.BILL_CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyBillConsumerTargetsByRefIdsQuery {
    constructor(public readonly props: IProps) {}
}
