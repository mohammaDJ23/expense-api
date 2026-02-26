import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';

import { GetHealthHandler } from '@/modules/health/applications/queries/getHealth/getHealth.handler';
import { HealthService } from '@/modules/health/applications/services/health.service';
import { DatabaseIndicator } from '@/modules/health/infrastructure/indicators/database.indicator';
import { RedisIndicator } from '@/modules/health/infrastructure/indicators/redis.indicator';
import { HealthController } from '@/modules/health/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, HttpModule, TerminusModule],
    controllers: [HealthController],
    providers: [HealthService, GetHealthHandler, DatabaseIndicator, RedisIndicator],
})
export class HealthModule {}
