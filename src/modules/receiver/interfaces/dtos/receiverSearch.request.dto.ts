import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';

import { MAX_LIST_LIMIT, MIN_LIST_LIMIT } from '@/core/core.constants';

export class ReceiverSearchRequestDto {
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

    @IsOptional()
    @Type(() => String)
    @IsString()
    @ApiPropertyOptional({
        type: 'string',
        example: 'a text for searching',
    })
    q = '';
}
