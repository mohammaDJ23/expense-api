import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';

import { MAX_LIST_LIMIT } from '@/common/common.constants';

export class SearchRequestDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(MAX_LIST_LIMIT)
    limit?: number;

    @IsOptional()
    @IsString()
    q?: string;
}
