import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

interface IProps {
    userId: string;
    limit: number;
}

@Cacheable<FindMostUsedLocationsQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindMostUsedLocationsQuery {
    constructor(public readonly props: IProps) {}
}
