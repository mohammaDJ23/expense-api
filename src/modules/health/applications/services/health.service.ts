import { Injectable } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';

import { GetHealthHandler } from '../queries/getHealth/getHealth.handler';

@Injectable()
export class HealthSerice {
    constructor(private readonly getHealthHandler: GetHealthHandler) {}

    getHealth(): Promise<HealthCheckResult> {
        return this.getHealthHandler.execute();
    }
}
