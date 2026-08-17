import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyLocationsByUserIdAndIdsQuery>({
    namespace: CacheNamespace.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyLocationsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
