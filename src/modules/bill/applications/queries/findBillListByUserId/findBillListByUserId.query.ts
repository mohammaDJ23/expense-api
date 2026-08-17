import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    userId: string;
    limit: number;
    cursor: ICursor | null;
}

@Cacheable<FindBillListByUserIdQuery>({
    namespace: CacheNamespace.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
