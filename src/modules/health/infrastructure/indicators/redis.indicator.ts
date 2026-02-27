import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

import { REDIS_NAME } from '@/common/infrastructure/redis/redis.constants';
import { HealthEntity } from '@/modules/health/domain/entities/health.entity';

import type { IHealthIndicator } from '@/modules/health/domain/interfaces/healthIndicator.interface';
import type { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class RedisIndicator implements IHealthIndicator {
    constructor(private readonly redisService: RedisService) {}

    async check(): Promise<HealthIndicatorResult> {
        try {
            const redis = this.redisService.getOrNil();

            if (redis) {
                await redis.ping();

                return HealthEntity.up(REDIS_NAME).toJSON();
            }

            return HealthEntity.down(REDIS_NAME).toJSON();
        } catch (error) {
            return HealthEntity.down(REDIS_NAME, { error }).toJSON();
        }
    }
}
