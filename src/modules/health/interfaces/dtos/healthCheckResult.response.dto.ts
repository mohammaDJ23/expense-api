import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { HealthStatus } from '@/modules/health/domain/enums/healthStatus.enum';

import { HealthEntityResponseDto } from './healthEntity.response.dto';

export class HealthCheckResultResponseDto {
    @Expose()
    @ApiProperty({
        enum: HealthStatus,
    })
    status: HealthStatus;

    @Expose()
    @ApiProperty({
        type: 'object',
        additionalProperties: {
            $ref: getSchemaPath(HealthEntityResponseDto),
        },
    })
    details: Record<string, HealthEntityResponseDto>;
}
