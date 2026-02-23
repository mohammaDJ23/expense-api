import { Module } from '@nestjs/common';

import { ConfigModule } from '@/common/infrastructure/config/config.module';
import { DatabaseModule } from '@/common/infrastructure/database/database.module';
import { ExceptionModule } from '@/common/infrastructure/exception/exception.module';
import { RedisModule } from '@/common/infrastructure/redis/redis.module';
import { SwaggerModule } from '@/common/infrastructure/swagger/swagger.module';
import { VersionModule } from '@/common/infrastructure/version/version.module';

@Module({
    imports: [
        ExceptionModule,
        ConfigModule,
        VersionModule,
        DatabaseModule,
        RedisModule,
        SwaggerModule,
    ],
})
export class CommonModule {}
