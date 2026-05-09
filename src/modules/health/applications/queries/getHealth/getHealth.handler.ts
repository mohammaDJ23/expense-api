import { ServiceUnavailableException } from '@nestjs/common';
import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { type HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

import { DatabaseIndicator } from '@/modules/health/infrastructure/indicators/database.indicator';
import { RedisIndicator } from '@/modules/health/infrastructure/indicators/redis.indicator';

import { GetHealthQuery } from './getHealth.query';

@QueryHandler(GetHealthQuery)
export class GetHealthHandler implements IQueryHandler<GetHealthQuery> {
    constructor(
        private readonly databaseIndicator: DatabaseIndicator,
        private readonly redisIndicator: RedisIndicator,
        private readonly health: HealthCheckService,
    ) {}

    async execute(): Promise<HealthCheckResult> {
        try {
            return await this.health.check([
                () => this.databaseIndicator.check(),
                () => this.redisIndicator.check(),
            ]);
        } catch (error) {
            throw new ServiceUnavailableException(error);
        }
    }
}
