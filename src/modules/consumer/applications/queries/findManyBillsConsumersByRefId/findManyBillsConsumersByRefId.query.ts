import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

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
