import { Controller, Get } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';

import { HealthSerice } from '../../applications/services/health.service';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthSerice) {}

    @Get()
    getHealth(): Promise<HealthCheckResult> {
        return this.healthService.getHealth();
    }
}
