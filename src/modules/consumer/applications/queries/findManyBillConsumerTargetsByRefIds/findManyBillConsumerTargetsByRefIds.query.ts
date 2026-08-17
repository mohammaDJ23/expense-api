import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    billIds: string[];
    userId: string;
}

@Cacheable<FindManyBillConsumerTargetsByRefIdsQuery>({
    namespace: CacheNamespace.BILL_CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyBillConsumerTargetsByRefIdsQuery {
    constructor(public readonly props: IProps) {}
}
