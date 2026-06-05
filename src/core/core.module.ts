import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { FallbackHostHandler } from '@/core/filters/globalException/fallbackHost.handler';
import { GlobalExceptionFilter } from '@/core/filters/globalException/globalException.filter';
import { HttpHostHandler } from '@/core/filters/globalException/httpHost.handler';
import { JwtGuard } from '@/core/guards/jwt.guard';
import { TransformResponseInterceptor } from '@/core/interceptors/transformResponse.interceptor';
import { JwtStrategy } from '@/core/strategies/jwt.strategy';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule],
    providers: [
        HttpHostHandler,
        FallbackHostHandler,
        JwtGuard,
        JwtStrategy,
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
