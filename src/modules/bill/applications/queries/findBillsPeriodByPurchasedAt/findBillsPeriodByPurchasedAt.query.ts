import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindBillsPeriodByPurchasedAtQuery>({
    namespace: CacheNamespace.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillsPeriodByPurchasedAtQuery {
    constructor(public readonly props: IProps) {}
}
