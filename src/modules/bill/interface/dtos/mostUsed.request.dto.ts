import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { MAX_LIST_LIMIT, MIN_LIST_LIMIT } from '@/core/core.constants';

export class MostUsedRequestDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_LIST_LIMIT)
    @Max(MAX_LIST_LIMIT)
    @ApiPropertyOptional({
        type: 'number',
        example: 10,
    })
    limit: number = MAX_LIST_LIMIT;
}
