import { Controller, Get } from '@nestjs/common';

import { HealthService } from '@/modules/health/applications/services/health.service';

import type { HealthCheckResult } from '@nestjs/terminus';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    getHealth(): Promise<HealthCheckResult> {
        return this.healthService.getHealth();
    }
}
