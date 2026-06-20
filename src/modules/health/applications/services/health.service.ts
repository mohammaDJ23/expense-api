import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetHealthQuery } from '@/modules/health/applications/queries/getHealth/getHealth.query';

import type { HealthCheckResult } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(private readonly queryBus: QueryBus) {}

    getHealth(): Promise<HealthCheckResult> {
        return this.queryBus.execute(new GetHealthQuery());
    }
}
