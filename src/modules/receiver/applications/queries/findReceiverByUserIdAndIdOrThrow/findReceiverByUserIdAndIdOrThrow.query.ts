import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindReceiverByUserIdAndIdOrThrowQuery>({
    namespace: CacheNamespace.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindReceiverByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
