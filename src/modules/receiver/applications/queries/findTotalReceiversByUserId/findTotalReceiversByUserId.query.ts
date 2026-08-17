import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalReceiversByUserIdQuery>({
    namespace: CacheNamespace.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalReceiversByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
