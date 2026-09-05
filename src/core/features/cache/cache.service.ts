import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

import { CACHE_SCAN_CURSOR_COUNT, DEFAULT_EX } from './cache.constants';

@Injectable()
export class CacheService {
    constructor(private readonly redisService: RedisService) {}

    async set(key: string, value: string, ex = DEFAULT_EX): Promise<void> {
        const redis = this.getRedis();

        await redis.set(key, value, 'EX', ex);
    }

    get(key: string): Promise<string | null> {
        const redis = this.getRedis();

        return redis.get(key);
    }

    async delete(...keys: string[]): Promise<void> {
        const redis = this.getRedis();

        await redis.del(...keys);
    }

    async *scan(pattern: string): AsyncGenerator<string> {
        const redis = this.getRedis();

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

            yield* keys;
        } while (cursor !== '0');
    }

    getRedis(): ReturnType<typeof this.redisService.getOrThrow> {
        return this.redisService.getOrThrow();
    }
}
