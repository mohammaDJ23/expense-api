import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

import { AppException } from '@/core/exceptions/app/exception';

import { THROTTLE_DEFAULT_NAME } from './throttler.constants';

import type { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
    ) {}

    // eslint-disable-next-line sonarjs/function-return-type
    createThrottlerOptions(): ThrottlerModuleOptions {
        try {
            const redisClient = this.redisService.getOrThrow();

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
                storage: new ThrottlerStorageRedisService(redisClient),
            };
        } catch (error) {
            throw new AppException(error);
        }
    }
}
