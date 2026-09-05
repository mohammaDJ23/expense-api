import { Injectable } from '@nestjs/common';

import { CacheService } from '@/core/features/cache/cache.service';
import { REDIS_NAME } from '@/infrastructure/redis/redis.constants';
import { HealthEntity } from '@/modules/health/domain/entities/health.entity';

import type { IHealthIndicator } from '@/modules/health/domain/interfaces/healthIndicator.interface';
import type { THealthIndicatorResult } from '@/modules/health/domain/types/healthIndicatorResult.type';

@Injectable()
export class CacheIndicator implements IHealthIndicator {
    constructor(private readonly cacheService: CacheService) {}

    async check(): Promise<THealthIndicatorResult> {
        try {
            const redis = this.cacheService.getRedis();

            await redis.ping();

            return HealthEntity.up(REDIS_NAME).toJSON();
        } catch (error) {
            return HealthEntity.down(REDIS_NAME, { error }).toJSON();
        }
    }
}
