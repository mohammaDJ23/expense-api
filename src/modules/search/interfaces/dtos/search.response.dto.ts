import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

export class SearchResponseDto {
    @Expose()
    @Type(() => BillResponseDto)
    @ApiProperty({
        type: BillResponseDto,
        isArray: true,
    })
    bills: BillResponseDto[];

    @Expose()
    @Type(() => ReceiverResponseDto)
    @ApiProperty({
        type: ReceiverResponseDto,
        isArray: true,
    })
    receivers: ReceiverResponseDto[];

    @Expose()
    @Type(() => LocationResponseDto)
    @ApiProperty({
        type: LocationResponseDto,
        isArray: true,
    })
    locations: LocationResponseDto[];

    @Expose()
    @Type(() => ConsumerResponseDto)
    @ApiProperty({
        type: ConsumerResponseDto,
        isArray: true,
    })
    consumers: ConsumerResponseDto[];
}
