import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
    imports: [ConfigModule, DatabaseModule, RedisModule, SwaggerModule],
})
export class CommonModule {}
