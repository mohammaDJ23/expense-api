import type { CacheNamespace } from './cacheNamespace.enum';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

export interface ICacheable<T = TQuery> {
    namespace: CacheNamespace;
    scope?(query: T): string;
    ttl?: number;
}

export interface INormalizedCacheable<T = TQuery> extends Required<ICacheable<T>> {}
