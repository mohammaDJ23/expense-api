import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class EmailVerificationCacheService {
    constructor(private readonly redisService: RedisService) {}

    async cache(key: string, value: string): Promise<void> {
        try {
            const redis = this.redisService.getOrThrow();

            // NOTICE: this timer should match with the token expiration time
            await redis.setex(key, 15 * 60, value);
        } catch {
            throw new InternalServerErrorException('Failed to cache the email verification token');
        }
    }
}
