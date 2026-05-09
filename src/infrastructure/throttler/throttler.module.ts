import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule as BaseThrottlerModule } from '@nestjs/throttler';

import { RedisModule } from '@/infrastructure/redis/redis.module';

import { ThrottlerGuard } from './throttler.guard';
import { ThrottlerConfigService } from './throttlerConfig.service';

@Module({
    imports: [
        BaseThrottlerModule.forRootAsync({
            useClass: ThrottlerConfigService,
            imports: [RedisModule],
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class ThrottlerModule {}
