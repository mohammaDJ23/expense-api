import { Controller, Get } from '@nestjs/common';

import { HealthSerice } from '@/modules/health/applications/services/health.service';

import type { HealthCheckResult } from '@nestjs/terminus';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthSerice) {}

    @Get()
    getHealth(): Promise<HealthCheckResult> {
        return this.healthService.getHealth();
    }
}
