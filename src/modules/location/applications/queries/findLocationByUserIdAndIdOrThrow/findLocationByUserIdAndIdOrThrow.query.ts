import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindLocationByUserIdAndIdOrThrowQuery>({
    namespace: CacheNamespace.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindLocationByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
