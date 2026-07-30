import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetHealthQuery } from '@/modules/health/applications/queries/getHealth/getHealth.query';

import type { IHealthCheckResult } from '@/modules/health/domain/interfaces/healthCheckResult.interface';

@Injectable()
export class HealthService {
    constructor(private readonly queryBus: QueryBus) {}

    getHealth(): Promise<IHealthCheckResult> {
        return this.queryBus.execute<GetHealthQuery, IHealthCheckResult>(new GetHealthQuery());
    }
}
