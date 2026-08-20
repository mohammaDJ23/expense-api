import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/bill.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindBillByUserIdAndIdOrThrowQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
