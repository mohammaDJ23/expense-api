import { Injectable } from '@nestjs/common';

import { CACHE_KEY_PREFIX } from './queryCache.constants';

import type { TQueryCacheNamespace } from './queryCacheNamespace.type';

@Injectable()
export class QueryCacheKeyService {
    create(namespace: TQueryCacheNamespace, scopeId: string, hash: string): string {
        return `${CACHE_KEY_PREFIX}:${namespace}:${scopeId}:${hash}`;
    }

    createScopePattern(namespace: string, scopeId: string): string {
        return `${CACHE_KEY_PREFIX}:${namespace}:${scopeId}:*`;
    }
}
