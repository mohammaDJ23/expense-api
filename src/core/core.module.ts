import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ClientTimezoneModule } from '@/core/features/clientTimezone/clientTimezone.module';
import { TransformResponseInterceptor } from '@/core/features/responses/http/transformResponse.interceptor';
import { GlobalFilterModule } from '@/core/filters/global/globalFilter.module';
import { ApiVersioningService } from '@/core/services/apiVersioning.service';
import { AppInstanceService } from '@/core/services/appInstance.service';
import { VersionService } from '@/core/services/version.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        GlobalFilterModule,
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
