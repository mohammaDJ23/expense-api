import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infrastructure/database/database.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { MailerModule } from '@/infrastructure/mailer/mailer.module';
import { LoggerModule } from '@/infrastructure/pino/pino.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';
import { ScheduleModule } from '@/infrastructure/schedule/schedule.module';
import { SwaggerModule } from '@/infrastructure/swagger/swagger.module';
import { ThrottlerModule } from '@/infrastructure/throttler/throttler.module';

@Module({
    imports: [
        DatabaseModule,
        RedisModule,
        SwaggerModule,
        ThrottlerModule,
        LoggerModule,
        MailerModule,
        JwtModule,
        ScheduleModule,
    ],
})
export class InfrastructureModule {}
