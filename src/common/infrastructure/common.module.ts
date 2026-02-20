import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { SwaggerModule } from './swagger/swagger.module';
import { VersionModule } from './version/version.module';

@Module({
    imports: [ConfigModule, VersionModule, DatabaseModule, RedisModule, SwaggerModule],
})
export class CommonModule {}
