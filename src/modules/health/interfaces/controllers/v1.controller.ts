import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { HealthService } from '@/modules/health/applications/services/health.service';
import { httpHealthResponseSwaggerSchema } from '@/modules/health/infrastructure/swagger/schemas/httpHealthResponse.schema';
import { HealthCheckResultResponseDto } from '@/modules/health/interfaces/dtos/healthCheckResult.response.dto';
import { HealthEntityResponseDto } from '@/modules/health/interfaces/dtos/healthEntity.response.dto';

import { SUCCESS_HEALTH_MESSAGE } from './v1.constants';

import type { IHealthCheckResult } from '@/modules/health/domain/types/healthCheckResult.type';

@ApiTags('Health')
@Controller({ version: '1', path: 'api/health' })
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    @SerializerInterceptor(HealthCheckResultResponseDto)
    @HttpResponse(SUCCESS_HEALTH_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Health check',
        description: 'For checking the health of the app',
        operationId: 'health',
    })
    @ApiExtraModels(
        HttpResponseDto,
        ExceptionDto,
        HealthCheckResultResponseDto,
        HealthEntityResponseDto,
    )
    @ApiOkResponse({ schema: httpHealthResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    getHealth(): Promise<IHealthCheckResult> {
        return this.healthService.getHealth();
    }
}
