import { Module } from '@nestjs/common';

import { ApiVersioningModule } from '@/infrastructure/apiVersioning/apiVersioning.module';
import { AppInstanceModule } from '@/infrastructure/appInstance/appInstance.module';
import { ConfigModule } from '@/infrastructure/config/config.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { MailerModule } from '@/infrastructure/mailer/mailer.module';
import { LoggerModule } from '@/infrastructure/pino/pino.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';
import { ScheduleModule } from '@/infrastructure/schedule/schedule.module';
import { SwaggerModule } from '@/infrastructure/swagger/swagger.module';
import { ThrottlerModule } from '@/infrastructure/throttler/throttler.module';
import { VersionModule } from '@/infrastructure/version/version.module';

@Module({
    imports: [
        ConfigModule,
        AppInstanceModule,
        VersionModule,
        DatabaseModule,
        RedisModule,
        SwaggerModule,
        ThrottlerModule,
        LoggerModule,
        ApiVersioningModule,
        MailerModule,
        JwtModule,
        ScheduleModule,
    ],
})
export class InfrastructureModule {}
