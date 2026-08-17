import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalLocationsByUserIdQuery>({
    namespace: CacheNamespace.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalLocationsByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
