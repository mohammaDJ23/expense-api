import { Injectable } from '@nestjs/common';

import { CacheService } from '@/core/features/cache/cache.service';

import { CACHE_DELETE_BATCH_SIZE } from './queryCache.constants';
import { QueryCacheHasherService } from './queryCacheHasher.service';
import { QueryCacheKeyService } from './queryCacheKey.service';

import type { TQueryCacheNamespace } from './queryCacheNamespace.type';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class QueryCacheService {
    constructor(
        private readonly cacheService: CacheService,
        private readonly queryCacheHasherService: QueryCacheHasherService,
        private readonly queryCacheKeyService: QueryCacheKeyService,
    ) {}

    get(namespace: TQueryCacheNamespace, scopeId: string, query: TQuery): Promise<string | null> {
        const key = this.createKey(namespace, scopeId, query);

        return this.cacheService.get(key);
    }

    async set<T>(
        namespace: TQueryCacheNamespace,
        scopeId: string,
        query: TQuery,
        value: T,
        ttl: number,
    ): Promise<void> {
        const key = this.createKey(namespace, scopeId, query);
        const serializedValue = JSON.stringify(value);

        await this.cacheService.set(key, serializedValue, ttl);
    }

    async invalidateScope(namespace: TQueryCacheNamespace, scopeId: string): Promise<void> {
        const pattern = this.queryCacheKeyService.createScopePattern(namespace, scopeId);

        const batch: string[] = [];

        for await (const key of this.cacheService.scan(pattern)) {
            batch.push(key);

            if (batch.length >= CACHE_DELETE_BATCH_SIZE) {
                await this.cacheService.delete(...batch);

                batch.length = 0;
            }
        }

        if (batch.length > 0) {
            await this.cacheService.delete(...batch);
        }
    }

    private createKey(namespace: TQueryCacheNamespace, scopeId: string, query: TQuery): string {
        const hash = this.queryCacheHasherService.execute(query);

        return this.queryCacheKeyService.create(namespace, scopeId, hash);
    }
}
