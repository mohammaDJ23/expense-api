import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

interface IProps {
    id: string;
}

@Cacheable<FindUserByIdOrThrowQuery>({
    namespace: CacheNamespace.USER,
})
export class FindUserByIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
