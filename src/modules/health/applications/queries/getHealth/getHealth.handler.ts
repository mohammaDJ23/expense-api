import { ServiceUnavailableException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

import { DatabaseIndicator } from 'src/modules/health/infrastructure/indicators/database.indicator';
import { NestJsWebsiteIndicator } from 'src/modules/health/infrastructure/indicators/nestjsWebsite.indicator';
import { RedisIndicator } from 'src/modules/health/infrastructure/indicators/redis.indicator';

import { IGetHealthQuery } from './getHealth.query';

@QueryHandler(IGetHealthQuery)
export class GetHealthHandler implements IQueryHandler<IGetHealthQuery> {
    constructor(
        private readonly databaseIndicator: DatabaseIndicator,
        private readonly redisIndicator: RedisIndicator,
        private readonly nestJsWebsiteIndicator: NestJsWebsiteIndicator,
        private readonly health: HealthCheckService,
    ) {}

    async execute(): Promise<HealthCheckResult> {
        try {
            return await this.health.check([
                () => this.databaseIndicator.check(),
                () => this.redisIndicator.check(),
                () => this.nestJsWebsiteIndicator.check(),
            ]);
        } catch (error) {
            throw new ServiceUnavailableException(error);
        }
    }
}
