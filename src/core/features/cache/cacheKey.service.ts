import { Injectable } from '@nestjs/common';

import { CACHE_KEY_PREFIX } from './cache.constants';

import type { TCacheNamespace } from './cacheNamespace.type';

@Injectable()
export class CacheKeyService {
    create(namespace: TCacheNamespace, scopeId: string, hash: string): string {
        return `${CACHE_KEY_PREFIX}:${namespace}:${scopeId}:${hash}`;
    }

    createScopePattern(namespace: string, scopeId: string): string {
        return `${CACHE_KEY_PREFIX}:${namespace}:${scopeId}:*`;
    }
}
