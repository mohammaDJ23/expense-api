import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CacheModule } from '@/core/features/cache/cache.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { GetHealthHandler } from '@/modules/health/applications/queries/getHealth/getHealth.handler';
import { HealthService } from '@/modules/health/applications/services/health.service';
import { CacheIndicator } from '@/modules/health/infrastructure/indicators/cache.indicator';
import { DatabaseIndicator } from '@/modules/health/infrastructure/indicators/database.indicator';
import { HealthController } from '@/modules/health/interfaces/controllers/v1.controller';

@Module({
    imports: [HttpModule, CqrsModule, CacheModule],
    controllers: [HealthController],
    providers: [HealthService, GetHealthHandler, DatabaseIndicator, CacheIndicator],
})
export class HealthModule {}
