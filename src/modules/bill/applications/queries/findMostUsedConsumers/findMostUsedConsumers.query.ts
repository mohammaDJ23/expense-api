import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    limit: number;
}

@Cacheable<FindMostUsedConsumersQuery>({
    namespace: CacheNamespace.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindMostUsedConsumersQuery {
    constructor(public readonly props: IProps) {}
}
