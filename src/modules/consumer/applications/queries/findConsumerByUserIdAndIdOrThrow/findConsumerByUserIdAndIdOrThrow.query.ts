import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindConsumerByUserIdAndIdOrThrowQuery>({
    namespace: CacheNamespace.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindConsumerByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
