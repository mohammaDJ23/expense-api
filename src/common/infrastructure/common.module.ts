import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ExceptionModule } from './exception/exception.module';
import { RedisModule } from './redis/redis.module';
import { SwaggerModule } from './swagger/swagger.module';
import { VersionModule } from './version/version.module';

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
