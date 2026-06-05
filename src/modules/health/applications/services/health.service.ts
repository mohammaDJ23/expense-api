import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetHealthQuery } from '@/modules/health/applications/queries/getHealth/getHealth.query';

import type { HealthCheckResult } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(private readonly queryBus: QueryBus) {}

    getHealth(): Promise<HealthCheckResult> {
        try {
            const getHealthQuery = new GetHealthQuery();
            return this.queryBus.execute(getHealthQuery);
        } catch {
            throw new ServiceUnavailableException('Health check failed');
        }
    }
}
