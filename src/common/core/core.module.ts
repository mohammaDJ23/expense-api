import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { FallbackHostHandler } from '@/common/core/filters/globalException/fallbackHost.handler';
import { GlobalExceptionFilter } from '@/common/core/filters/globalException/globalException.filter';
import { HttpHostHandler } from '@/common/core/filters/globalException/httpHost.handler';
import { TransformResponseInterceptor } from '@/common/core/interceptors/transformResponse.interceptor';

@Module({
    providers: [
        HttpHostHandler,
        FallbackHostHandler,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },
    ],
})
export class CoreModule {}
