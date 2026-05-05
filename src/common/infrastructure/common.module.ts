import { Module } from '@nestjs/common';

import { ApiVersioningModule } from '@/common/infrastructure/apiVersioning/apiVersioning.module';
import { AppInstanceModule } from '@/common/infrastructure/appInstance/appInstance.module';
import { ConfigModule } from '@/common/infrastructure/config/config.module';
import { CoreModule } from '@/common/infrastructure/core/core.module';
import { DatabaseModule } from '@/common/infrastructure/database/database.module';
import { ExceptionModule } from '@/common/infrastructure/exception/exception.module';
import { LoggerModule } from '@/common/infrastructure/pino/pino.module';
import { RedisModule } from '@/common/infrastructure/redis/redis.module';
import { SwaggerModule } from '@/common/infrastructure/swagger/swagger.module';
import { ThrottlerModule } from '@/common/infrastructure/throttler/throttler.module';
import { VersionModule } from '@/common/infrastructure/version/version.module';

@Module({
    imports: [
        CoreModule,
        ExceptionModule,
        ConfigModule,
        AppInstanceModule,
        VersionModule,
        DatabaseModule,
        RedisModule,
        SwaggerModule,
        ThrottlerModule,
        LoggerModule,
        ApiVersioningModule,
    ],
})
export class CommonModule {}
