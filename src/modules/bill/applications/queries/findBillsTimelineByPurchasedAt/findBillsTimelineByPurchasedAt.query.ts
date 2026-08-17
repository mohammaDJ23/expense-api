import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    start: string;
    end: string;
    clientTimezone: string;
}

@Cacheable<FindBillsTimelineByPurchasedAtQuery>({
    namespace: CacheNamespace.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillsTimelineByPurchasedAtQuery {
    constructor(public readonly props: IProps) {}
}
