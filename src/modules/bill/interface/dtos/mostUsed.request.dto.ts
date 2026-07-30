import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { MAX_LIST_LIMIT, MIN_LIST_LIMIT } from '@/common/common.constants';

export class MostUsedRequestDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_LIST_LIMIT)
    @Max(MAX_LIST_LIMIT)
    limit: number = MAX_LIST_LIMIT;
}
