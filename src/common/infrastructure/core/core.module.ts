import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TransformResponseInterceptor } from '@/common/infrastructure/core/interceptors/TransformResponse.interceptor';

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },
    ],
})
export class CoreModule {}
