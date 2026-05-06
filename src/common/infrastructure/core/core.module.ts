import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { FallbackHostHandler } from '@/common/infrastructure/core/filters/globalException/fallbackHost.handler';
import { GlobalExceptionFilter } from '@/common/infrastructure/core/filters/globalException/globalException.filter';
import { HttpHostHandler } from '@/common/infrastructure/core/filters/globalException/httpHost.handler';
import { TransformResponseInterceptor } from '@/common/infrastructure/core/interceptors/transformResponse.interceptor';

@Module({
    providers: [
        HttpHostHandler,
        FallbackHostHandler,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },
    ],
})
export class CoreModule {}
