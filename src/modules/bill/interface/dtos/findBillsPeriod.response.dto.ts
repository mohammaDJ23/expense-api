import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindBillsPeriodResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
        nullable: true,
    })
    start: string | null;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
        nullable: true,
    })
    end: string | null;
}
