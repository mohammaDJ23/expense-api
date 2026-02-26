import { Injectable } from '@nestjs/common';

import { GetHealthHandler } from '@/modules/health/applications/queries/getHealth/getHealth.handler';

import type { HealthCheckResult } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(private readonly getHealthHandler: GetHealthHandler) {}

    getHealth(): Promise<HealthCheckResult> {
        return this.getHealthHandler.execute();
    }
}
