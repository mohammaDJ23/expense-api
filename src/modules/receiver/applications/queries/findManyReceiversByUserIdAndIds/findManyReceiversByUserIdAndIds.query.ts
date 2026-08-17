import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyReceiversByUserIdAndIdsQuery>({
    namespace: CacheNamespace.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyReceiversByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
