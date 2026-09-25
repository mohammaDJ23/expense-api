import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindBillsTimelineResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    date: string;

    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    count: number;
}
