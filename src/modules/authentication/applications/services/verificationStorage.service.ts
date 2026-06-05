import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class VerificationStorageService {
    private readonly prefixKey = 'verification';

    constructor(private readonly redisService: RedisService) {}

    async set(key: string, value: string): Promise<void> {
        const redis = this.redisService.getOrThrow();
        await redis.setex(
            `${this.prefixKey}_${key}`,
            // this time should be syncing with the token expiration time
            1 * 60 * 10,
            value,
        );
    }

    get(key: string): Promise<string | null> {
        const redis = this.redisService.getOrThrow();
        return redis.get(`${this.prefixKey}_${key}`);
    }

    async delete(key: string): Promise<void> {
        const redis = this.redisService.getOrThrow();
        await redis.del(`${this.prefixKey}_${key}`);
    }
}
