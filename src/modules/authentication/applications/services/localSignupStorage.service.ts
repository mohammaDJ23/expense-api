import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class LocalSignupStorageService {
    private readonly prefixKey = 'local-signup';

    constructor(private readonly redisService: RedisService) {}

    async set(key: string, value: string): Promise<void> {
        const redis = this.redisService.getOrThrow();
        await redis.setex(`${this.prefixKey}:${key}`, 1 * 60 * 10, value);
    }

    get(key: string): Promise<string | null> {
        const redis = this.redisService.getOrThrow();
        return redis.get(`${this.prefixKey}:${key}`);
    }

    async delete(key: string): Promise<void> {
        const redis = this.redisService.getOrThrow();
        await redis.del(`${this.prefixKey}:${key}`);
    }
}
