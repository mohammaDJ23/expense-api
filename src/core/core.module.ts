import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ExceptionNormalizerModule } from '@/core/exceptions/normalizer/exceptionNormalizer.module';
import { FilterModule } from '@/core/filters/filter.module';
import { GoogleModule } from '@/core/google/google.module';
import { JwtAuthGuard } from '@/core/guards/jwtAuth.guard';
import { TransformResponseInterceptor } from '@/core/interceptors/transformResponse.interceptor';
import { ApiVersioningService } from '@/core/services/apiVersioning.service';
import { AppInstanceService } from '@/core/services/appInstance.service';
import { VersionService } from '@/core/services/version.service';
import { JwtAuthStrategy } from '@/core/strategies/jwtAuth.strategy';

@Module({
    imports: [ExceptionNormalizerModule, FilterModule, GoogleModule],
    providers: [
        JwtAuthGuard,
        JwtAuthStrategy,
        ApiVersioningService,
        AppInstanceService,
        VersionService,
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
