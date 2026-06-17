import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';

import { GetHealthHandler } from '@/modules/health/applications/queries/getHealth/getHealth.handler';
import { GetHealthService } from '@/modules/health/applications/services/getHealth.service';
import { DatabaseIndicator } from '@/modules/health/infrastructure/indicators/database.indicator';
import { RedisIndicator } from '@/modules/health/infrastructure/indicators/redis.indicator';
import { HealthController } from '@/modules/health/interfaces/controllers/v1.controller';

@Module({
    imports: [HttpModule, TerminusModule, CqrsModule],
    controllers: [HealthController],
    providers: [GetHealthService, GetHealthHandler, DatabaseIndicator, RedisIndicator],
})
export class HealthModule {}
