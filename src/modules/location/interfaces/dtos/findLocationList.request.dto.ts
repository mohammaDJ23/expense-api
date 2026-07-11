import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';

import { MAX_LIST_LIMIT, MIN_LIST_LIMIT } from '@/common/common.constants';

export class FindLocationListRequestDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_LIST_LIMIT)
    @Max(MAX_LIST_LIMIT)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsString()
    q?: string;
}
