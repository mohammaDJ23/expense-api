import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyBillsByUserIdAndIdsQuery>({
    namespace: CacheNamespace.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyBillsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
