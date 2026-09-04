import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

interface IProps {
    userId: string;
    limit: number;
}

@Cacheable<FindMostUsedReceiversQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindMostUsedReceiversQuery {
    constructor(public readonly props: IProps) {}
}
