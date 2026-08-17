import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalConsumersByUserIdQuery>({
    namespace: CacheNamespace.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalConsumersByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
