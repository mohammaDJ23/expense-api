import { Injectable } from '@nestjs/common';

import { CACHE_KEY_PREFIX } from './cache.constants';

import type { CacheNamespace } from './cacheNamespace.enum';

@Injectable()
export class CacheKeyService {
    create(namespace: CacheNamespace, scopeId: string, hash: string): string {
        return `${CACHE_KEY_PREFIX}:${namespace}:${scopeId}:${hash}`;
    }

    createScopePattern(namespace: string, scopeId: string): string {
        return `${CACHE_KEY_PREFIX}:${namespace}:${scopeId}:*`;
    }
}
