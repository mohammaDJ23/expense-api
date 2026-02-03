import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { RedisService } from '@liaoliaots/nestjs-redis';

import { REDIS_NAME } from 'src/common/constants';

import { HealthEntity } from '../../domain/entities/health.entity';
import { IHealthIndicator } from '../../domain/interfaces/healthIndicator.interface';

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
