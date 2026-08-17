import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyConsumersByUserIdAndIdsQuery>({
    namespace: CacheNamespace.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyConsumersByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
