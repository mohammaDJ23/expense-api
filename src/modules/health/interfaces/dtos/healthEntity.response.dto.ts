import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IndicatorHealthStatus } from '@/modules/health/domain/enums/indicatorHealthStatus.enum';

export class HealthEntityResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    timestamp: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'redis',
    })
    name: string;

    @Expose()
    @ApiProperty({
        enum: IndicatorHealthStatus,
        example: IndicatorHealthStatus.UP,
    })
    status: IndicatorHealthStatus;

    @Expose()
    @ApiProperty({
        type: 'object',
        additionalProperties: true,
    })
    details: Record<string, unknown>;
}
