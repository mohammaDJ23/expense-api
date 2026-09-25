import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ConsumerResponseDto } from './consumer.response.dto';

export class FindConsumerListResponseDto {
    @Type(() => ConsumerResponseDto)
    @Expose()
    @ApiProperty({
        type: ConsumerResponseDto,
        isArray: true,
    })
    items: ConsumerResponseDto[];

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
