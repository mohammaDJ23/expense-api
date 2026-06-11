import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ExceptionNormalizerModule } from '@/core/exceptions/normalizer/exceptionNormalizer.module';
import { FallbackHostHandler } from '@/core/filters/globalException/fallbackHost.handler';
import { GlobalExceptionFilter } from '@/core/filters/globalException/globalException.filter';
import { HttpHostHandler } from '@/core/filters/globalException/httpHost.handler';
import { GoogleAuthGuard } from '@/core/guards/googleAuth.guard';
import { JwtAuthGuard } from '@/core/guards/jwtAuth.guard';
import { TransformResponseInterceptor } from '@/core/interceptors/transformResponse.interceptor';
import { ApiVersioningService } from '@/core/services/apiVersioning.service';
import { AppInstanceService } from '@/core/services/appInstance.service';
import { VersionService } from '@/core/services/version.service';
import { GoogleAuthStrategy } from '@/core/strategies/googleAuth.strategy';
import { JwtAuthStrategy } from '@/core/strategies/jwtAuth.strategy';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule, CqrsModule, ExceptionNormalizerModule],
    providers: [
        HttpHostHandler,
        FallbackHostHandler,
        JwtAuthGuard,
        JwtAuthStrategy,
        GoogleAuthGuard,
        GoogleAuthStrategy,
        ApiVersioningService,
        AppInstanceService,
        VersionService,
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
    exports: [AppInstanceService, VersionService],
})
export class CoreModule {}
