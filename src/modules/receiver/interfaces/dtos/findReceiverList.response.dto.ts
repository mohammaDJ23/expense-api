import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ReceiverResponseDto } from './receiver.response.dto';

export class FindReceiverListResponseDto {
    @Type(() => ReceiverResponseDto)
    @Expose()
    @ApiProperty({
        type: ReceiverResponseDto,
        isArray: true,
    })
    items: ReceiverResponseDto[];

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
