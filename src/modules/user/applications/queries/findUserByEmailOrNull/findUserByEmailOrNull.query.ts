import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    email: string;
}

@Cacheable<FindUserByEmailOrNullQuery>({
    namespace: CacheNamespace.USER,
})
export class FindUserByEmailOrNullQuery {
    constructor(public readonly props: IProps) {}
}
