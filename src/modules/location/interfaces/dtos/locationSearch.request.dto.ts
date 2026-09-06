import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';

import { MAX_LIST_LIMIT, MIN_LIST_LIMIT } from '@/core/core.constants';

export class LocationSearchRequestDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_LIST_LIMIT)
    @Max(MAX_LIST_LIMIT)
    limit: number = MAX_LIST_LIMIT;

    @IsOptional()
    @Type(() => String)
    @IsString()
    q = '';
}
