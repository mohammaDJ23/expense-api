import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindBillByUserIdAndIdOrThrowQuery>({
    namespace: CacheNamespace.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
