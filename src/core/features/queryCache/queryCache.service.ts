import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

import { CACHE_SCAN_CURSOR_COUNT } from './queryCache.constants';
import { QueryCacheHasherService } from './queryCacheHasher.service';
import { QueryCacheKeyService } from './queryCacheKey.service';

import type { TQueryCacheNamespace } from './queryCacheNamespace.type';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class QueryCacheService {
    constructor(
        private readonly redisService: RedisService,
        private readonly queryCacheHasherService: QueryCacheHasherService,
        private readonly queryCacheKeyService: QueryCacheKeyService,
    ) {}

    get(namespace: TQueryCacheNamespace, scopeId: string, query: TQuery): Promise<string | null> {
        const redis = this.getRedis();
        const key = this.createKey(namespace, scopeId, query);

        return redis.get(key);
    }

    async set<T>(
        namespace: TQueryCacheNamespace,
        scopeId: string,
        query: TQuery,
        value: T,
        ttl: number,
    ): Promise<void> {
        const redis = this.getRedis();
        const key = this.createKey(namespace, scopeId, query);
        const serializedValue = JSON.stringify(value);

        await redis.set(key, serializedValue, 'EX', ttl);
    }

    async invalidateScope(namespace: TQueryCacheNamespace, scopeId: string): Promise<void> {
        const redis = this.getRedis();
        const pattern = this.queryCacheKeyService.createScopePattern(namespace, scopeId);

        let cursor = '0';
        do {
            const [nextCursor, keys] = await redis.scan(
                cursor,
                'MATCH',
                pattern,
                'COUNT',
                CACHE_SCAN_CURSOR_COUNT,
            );

            cursor = nextCursor;

            if (keys.length > 0) {
                await redis.del(keys);
            }
        } while (cursor !== '0');
    }

    private createKey(namespace: TQueryCacheNamespace, scopeId: string, query: TQuery): string {
        const hash = this.queryCacheHasherService.execute(query);

        return this.queryCacheKeyService.create(namespace, scopeId, hash);
    }

    private getRedis(): ReturnType<typeof this.redisService.getOrThrow> {
        return this.redisService.getOrThrow();
    }
}
