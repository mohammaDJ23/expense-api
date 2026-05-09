import { Injectable } from '@nestjs/common';

import { GetHealthQuery } from '@/modules/health/applications/queries/getHealth/getHealth.query';

import type { QueryBus } from '@nestjs/cqrs';
import type { HealthCheckResult } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(private readonly queryBus: QueryBus) {}

    getHealth(): Promise<HealthCheckResult> {
        const getHealthQuery = new GetHealthQuery();
        return this.queryBus.execute(getHealthQuery);
    }
}
