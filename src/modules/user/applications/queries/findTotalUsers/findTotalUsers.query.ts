import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

@Cacheable<FindTotalUsersQuery>({
    namespace: CacheNamespace.USER,
})
export class FindTotalUsersQuery {
    constructor() {}
}
