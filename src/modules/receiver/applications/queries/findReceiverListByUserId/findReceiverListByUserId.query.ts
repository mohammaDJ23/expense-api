import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    userId: string;
    cursor: ICursor | null;
    limit: number;
}

@Cacheable<FindReceiverListByUserIdQuery>({
    namespace: CacheNamespace.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindReceiverListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
