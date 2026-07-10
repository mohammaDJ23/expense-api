import { Expose, Type } from 'class-transformer';

import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

export class SearchResponseDto {
    @Expose()
    @Type(() => BillResponseDto)
    bills: BillResponseDto[];

    @Expose()
    @Type(() => ReceiverResponseDto)
    receivers: ReceiverResponseDto[];

    @Expose()
    @Type(() => LocationResponseDto)
    locations: LocationResponseDto[];

    @Expose()
    @Type(() => ConsumerResponseDto)
    consumers: ConsumerResponseDto[];
}
