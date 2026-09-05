import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

import { CacheService } from '@/core/features/cache/cache.service';

import { THROTTLE_DEFAULT_NAME } from './throttler.constants';

import type { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
        private readonly cacheService: CacheService,
    ) {}

    // eslint-disable-next-line sonarjs/function-return-type
    createThrottlerOptions(): ThrottlerModuleOptions {
        try {
            const redis = this.cacheService.getRedis();

            return {
                throttlers: [
                    {
                        name: THROTTLE_DEFAULT_NAME,
                        ttl: parseInt(this.configService.getOrThrow<string>('THROTTLE_TTL'), 10),
                        limit: parseInt(
                            this.configService.getOrThrow<string>('THROTTLE_LIMIT'),
                            10,
                        ),
                    },
                ],
                storage: new ThrottlerStorageRedisService(redis),
            };
        } catch {
            throw new Error('Could not get the throttle configuration');
        }
    }
}
