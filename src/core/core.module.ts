import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ClientTimezoneModule } from '@/core/features/clientTimezone/clientTimezone.module';
import { FiltersModule } from '@/core/filters/filters.module';
import { TransformResponseInterceptor } from '@/core/interceptors/transformResponse.interceptor';
import { ApiVersioningService } from '@/core/services/apiVersioning.service';
import { AppInstanceService } from '@/core/services/appInstance.service';
import { VersionService } from '@/core/services/version.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        FiltersModule,
        ClientTimezoneModule,
    ],
    providers: [
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
