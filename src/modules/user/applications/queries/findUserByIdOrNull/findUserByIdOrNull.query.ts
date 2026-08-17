import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    id: string;
}

@Cacheable({
    namespace: CacheNamespace.USER,
})
export class FindUserByIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
