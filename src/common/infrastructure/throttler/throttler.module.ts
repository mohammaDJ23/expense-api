import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule as BaseThrottlerModule } from '@nestjs/throttler';

import { ThrottlerGuard } from './throttler.guard';
import { ThrottlerConfigService } from './throttlerConfig.service';

@Module({
    imports: [
        BaseThrottlerModule.forRootAsync({
            useClass: ThrottlerConfigService,
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
