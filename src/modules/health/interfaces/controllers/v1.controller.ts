import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { ResponseMessage } from '@/core/decorators/responseMessage.decorator';
import { ResponseStatusCode } from '@/core/decorators/responseStatusCode.decorator';
import { HealthService } from '@/modules/health/applications/services/health.service';
import { SUCCESS_HEALTH_MESSAGE } from '@/modules/health/interfaces/constants/messages.constant';

import type { HealthCheckResult } from '@nestjs/terminus';

@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    @ResponseMessage(SUCCESS_HEALTH_MESSAGE)
    @ResponseStatusCode(HttpStatus.OK)
    @HttpCode(HttpStatus.OK)
    getHealth(): Promise<HealthCheckResult> {
        return this.healthService.getHealth();
    }
}
