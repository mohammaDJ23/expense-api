import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

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
