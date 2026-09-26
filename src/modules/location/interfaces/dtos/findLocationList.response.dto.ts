import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { LocationResponseDto } from './location.response.dto';

export class FindLocationListResponseDto {
    @Type(() => LocationResponseDto)
    @Expose()
    @ApiProperty({
        type: LocationResponseDto,
        isArray: true,
    })
    items: LocationResponseDto[];

    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    total: number;

    @Expose()
    @ApiProperty({
        type: 'boolean',
        example: true,
    })
    hasNextPage: boolean;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'e25hbWU6ICJkZGQifQ==',
        nullable: true,
    })
    nextCursor: string | null;
}
