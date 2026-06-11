import { Controller, Get, HttpStatus } from '@nestjs/common';

import { HttpResponse } from '@/core/httpResponse/httpResponse.decorator';
import { HealthService } from '@/modules/health/applications/services/health.service';

import { SUCCESS_HEALTH_MESSAGE } from './controllers.constant';

import type { HealthCheckResult } from '@nestjs/terminus';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    @HttpResponse(SUCCESS_HEALTH_MESSAGE, HttpStatus.OK)
    getHealth(): Promise<HealthCheckResult> {
        return this.healthService.getHealth();
    }
}
