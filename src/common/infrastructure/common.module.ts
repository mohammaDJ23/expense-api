import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { DatabaseModule } from '@/common/infrastructure/database/database.module';
import { ExceptionModule } from '@/common/infrastructure/exception/exception.module';
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
