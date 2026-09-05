import type { TQueryCacheNamespace } from './queryCacheNamespace.type';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

export interface ICacheable<T = TQuery> {
    namespace: TQueryCacheNamespace;
    scope?: (query: T) => string;
    ttl?: number;
}

export interface INormalizedCacheable<T = TQuery> extends Required<ICacheable<T>> {}
