import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetHealthQuery } from '@/modules/health/applications/queries/getHealth/getHealth.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { HealthCheckResult } from '@nestjs/terminus';

@Injectable()
export class GetHealthService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(): Promise<HealthCheckResult> {
        try {
            const getHealthQuery = new GetHealthQuery();
            return await this.queryBus.execute(getHealthQuery);
        } catch {
            throw new ServiceUnavailableException('Health check failed');
        }
    }
}
