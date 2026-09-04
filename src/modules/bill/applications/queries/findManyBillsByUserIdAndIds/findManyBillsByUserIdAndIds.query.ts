import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyBillsByUserIdAndIdsQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyBillsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
