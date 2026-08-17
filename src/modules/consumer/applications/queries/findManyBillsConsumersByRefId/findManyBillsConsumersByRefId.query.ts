import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    billId: string;
    userId: string;
}

@Cacheable<FindManyBillsConsumersByRefIdQuery>({
    namespace: CacheNamespace.BILL_CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyBillsConsumersByRefIdQuery {
    constructor(public readonly props: IProps) {}
}
