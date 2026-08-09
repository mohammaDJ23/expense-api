import { Expose, Type } from 'class-transformer';

import { LocationResponseDto } from './location.response.dto';

export class FindLocationListResponseDto {
    @Type(() => LocationResponseDto)
    @Expose()
    items: LocationResponseDto[];

    @Expose()
    total: number;

    @Expose()
    hasNextPage: boolean;

    @Expose()
    nextCursor: string | null;
}
