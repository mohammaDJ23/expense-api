import { Module } from '@nestjs/common';

import { CompressionModule } from '@/infrastructure/compression/compression.module';
import { CookieParserModule } from '@/infrastructure/cookieParser/cookieParser.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { KafkaModule } from '@/infrastructure/kafka/kafka.module';
import { MailerModule } from '@/infrastructure/mailer/mailer.module';
import { LoggerModule } from '@/infrastructure/pino/pino.module';
import { ScheduleModule } from '@/infrastructure/schedule/schedule.module';
import { SwaggerModule } from '@/infrastructure/swagger/swagger.module';
import { ThrottlerModule } from '@/infrastructure/throttler/throttler.module';

@Module({
    imports: [
        DatabaseModule,
        SwaggerModule,
        ThrottlerModule,
        LoggerModule,
        MailerModule,
        JwtModule,
        ScheduleModule,
        CompressionModule,
        CookieParserModule,
        KafkaModule,
    ],
})
export class InfrastructureModule {}
