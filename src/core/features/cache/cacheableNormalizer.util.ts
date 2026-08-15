import { DEFAULT_CACHE_SCOPE, DEFAULT_CACHE_TTL } from './cache.constants';

import type { ICacheable, INormalizedCacheable } from './cacheable.type';
import type { TQuery } from './query.type';

export function cacheableNormalizer<T = TQuery>(options: ICacheable<T>): INormalizedCacheable<T> {
    return {
        namespace: options.namespace,
        scope: options.scope ?? (() => DEFAULT_CACHE_SCOPE),
        ttl: options.ttl ?? DEFAULT_CACHE_TTL,
    };
}
