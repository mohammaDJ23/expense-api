import { Controller, Get, HttpStatus } from '@nestjs/common';

import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { GetHealthService } from '@/modules/health/applications/services/getHealth.service';

import { SUCCESS_HEALTH_MESSAGE } from './controllers.constants';

import type { HealthCheckResult } from '@nestjs/terminus';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly getHealthService: GetHealthService) {}

    @Get()
    @HttpResponse(SUCCESS_HEALTH_MESSAGE, HttpStatus.OK)
    getHealth(): Promise<HealthCheckResult> {
        return this.getHealthService.execute();
    }
}
