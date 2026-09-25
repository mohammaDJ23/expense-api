import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { HealthStatus } from '@/modules/health/domain/enums/healthStatus.enum';
import { IndicatorHealthStatus } from '@/modules/health/domain/enums/indicatorHealthStatus.enum';
import { CacheIndicator } from '@/modules/health/infrastructure/indicators/cache.indicator';
import { DatabaseIndicator } from '@/modules/health/infrastructure/indicators/database.indicator';

import { GetHealthQuery } from './getHealth.query';

import type { IHealthCheckResult } from '@/modules/health/domain/types/healthCheckResult.type';

@QueryHandler(GetHealthQuery)
export class GetHealthHandler implements IQueryHandler<GetHealthQuery, IHealthCheckResult> {
    constructor(
        private readonly databaseIndicator: DatabaseIndicator,
        private readonly cacheIndicator: CacheIndicator,
    ) {}

    async execute(): Promise<IHealthCheckResult> {
        try {
            const result: IHealthCheckResult = {
                status: HealthStatus.OK,
                details: {},
            };

            {
                const checks = await Promise.all([
                    this.databaseIndicator.check(),
                    this.cacheIndicator.check(),
                ]);
                for (const check of checks) {
                    result.details = Object.assign(result.details, check);
                }
            }

            result.status = Object.values(result.details).every(
                (indicator) => indicator.status === IndicatorHealthStatus.UP,
            )
                ? HealthStatus.OK
                : HealthStatus.ERROR;

            return result;
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
