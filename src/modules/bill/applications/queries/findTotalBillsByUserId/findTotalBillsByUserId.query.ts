import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalBillsByUserIdQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalBillsByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
