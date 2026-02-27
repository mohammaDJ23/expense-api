import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

import { AppException } from '@/common/kernel/exceptions/app/app.exception';

import { THROTTLE_DEFAULT_NAME, THROTTLE_LIMIT, THROTTLE_TTL } from './throttler.constants';

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
                        ttl: parseInt(
                            this.configService.get<number>('THROTTLE_TTL', THROTTLE_TTL).toString(),
                            10,
                        ),
                        limit: parseInt(
                            this.configService
                                .get<number>('THROTTLE_LIMIT', THROTTLE_LIMIT)
                                .toString(),
                            10,
                        ),
                    },
                ],
                storage: new ThrottlerStorageRedisService(redisClient),
                errorMessage: JSON.stringify(
                    new AppException('Too many requests, please try again later.'),
                ),
            };
        } catch (error) {
            throw new AppException(error);
        }
    }
}
