import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';

import { MAX_LIST_LIMIT, MIN_LIST_LIMIT } from '@/common/common.constants';

export class FindUserListRequestDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(MIN_LIST_LIMIT)
    @Max(MAX_LIST_LIMIT)
    limit: number = MAX_LIST_LIMIT;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset = 0;

    @IsOptional()
    @Type(() => String)
    @IsString()
    q = '';
}
