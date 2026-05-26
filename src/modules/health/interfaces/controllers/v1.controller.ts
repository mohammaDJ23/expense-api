import { Controller, Get, HttpStatus } from '@nestjs/common';

import { Response } from '@/core/decorators/Response.decorator';
import { HealthService } from '@/modules/health/applications/services/health.service';
import { SUCCESS_HEALTH_MESSAGE } from '@/modules/health/interfaces/constants/messages.constant';

import type { HealthCheckResult } from '@nestjs/terminus';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    @Response(SUCCESS_HEALTH_MESSAGE, HttpStatus.OK)
    getHealth(): Promise<HealthCheckResult> {
        return this.healthService.getHealth();
    }
}
