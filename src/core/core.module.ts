import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { FallbackHostHandler } from '@/core/filters/globalException/fallbackHost.handler';
import { GlobalExceptionFilter } from '@/core/filters/globalException/globalException.filter';
import { HttpHostHandler } from '@/core/filters/globalException/httpHost.handler';
import { JwtAuthGuard } from '@/core/guards/jwtAuth.guard';
import { TransformResponseInterceptor } from '@/core/interceptors/transformResponse.interceptor';
import { JwtAuthStrategy } from '@/core/strategies/jwtAuth.strategy';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule],
    providers: [
        HttpHostHandler,
        FallbackHostHandler,
        JwtAuthGuard,
        JwtAuthStrategy,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },
    ],
})
export class CoreModule {}
