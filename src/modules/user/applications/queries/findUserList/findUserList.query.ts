import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    cursor: ICursor | null;
    limit: number;
}

@Cacheable({
    namespace: CacheNamespace.USER,
})
export class FindUserListQuery {
    constructor(public readonly props: IProps) {}
}
