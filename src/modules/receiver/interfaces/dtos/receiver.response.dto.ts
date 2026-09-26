import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReceiverResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '9f466902-0a1d-4a24-b7bb-890434bc5adb',
    })
    id: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'Mr test',
    })
    name: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    createdAt: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    updatedAt: string;
}
