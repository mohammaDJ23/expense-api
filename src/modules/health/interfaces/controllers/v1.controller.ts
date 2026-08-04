import { Controller, Get, HttpStatus } from '@nestjs/common';

import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HealthService } from '@/modules/health/applications/services/health.service';

import { SUCCESS_HEALTH_MESSAGE } from './v1.constants';

import type { IHealthCheckResult } from '@/modules/health/domain/types/healthCheckResult.type';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    @HttpResponse(SUCCESS_HEALTH_MESSAGE, HttpStatus.OK)
    getHealth(): Promise<IHealthCheckResult> {
        return this.healthService.getHealth();
    }
}
