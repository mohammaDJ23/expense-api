import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

export class BillResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '9f466902-0a1d-4a24-b7bb-890434bc5adb',
    })
    id: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '1000',
    })
    amount: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'Some description',
    })
    description: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    purchasedAt: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:17:10.528Z',
    })
    createdAt: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:18:10.528Z',
    })
    updatedAt: string;

    @Exclude()
    @ApiHideProperty()
    userId: string;

    @Exclude()
    @ApiHideProperty()
    receiverId: string;

    @Exclude()
    @ApiHideProperty()
    locationId: string;

    @Expose()
    @Type(() => LocationResponseDto)
    @ApiProperty({
        type: LocationResponseDto,
    })
    location: LocationResponseDto;

    @Expose()
    @Type(() => ReceiverResponseDto)
    @ApiProperty({
        type: ReceiverResponseDto,
    })
    receiver: ReceiverResponseDto;

    @Expose()
    @Type(() => ConsumerResponseDto)
    @ApiProperty({
        type: ConsumerResponseDto,
        isArray: true,
    })
    consumers: ConsumerResponseDto[];
}
