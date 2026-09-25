import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BillResponseDto } from './bill.response.dto';

export class FindBillListResponseDto {
    @Type(() => BillResponseDto)
    @Expose()
    @ApiProperty({
        type: BillResponseDto,
        isArray: true,
    })
    items: BillResponseDto[];

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
