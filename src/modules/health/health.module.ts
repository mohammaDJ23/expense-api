import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';

import { GetHealthHandler } from './applications/queries/getHealth/getHealth.handler';
import { HealthSerice } from './applications/services/health.service';
import { DatabaseIndicator } from './infrastructure/indicators/database.indicator';
import { NestJsWebsiteIndicator } from './infrastructure/indicators/nestjsWebsite.indicator';
import { RedisIndicator } from './infrastructure/indicators/redis.indicator';
import { HealthController } from './interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, HttpModule, TerminusModule],
    controllers: [HealthController],
    providers: [
        HealthSerice,
        GetHealthHandler,
        DatabaseIndicator,
        RedisIndicator,
        NestJsWebsiteIndicator,
    ],
})
export class HealthModule {}
