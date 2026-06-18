import { Exclude, Expose, Type } from 'class-transformer';

import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

export class BillResponseDto {
    @Expose()
    id: string;

    @Expose()
    amount: string;

    @Expose()
    description: string;

    @Expose()
    purchasedAt: string | null;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;

    @Exclude()
    userId: string;

    @Exclude()
    receiverId: string;

    @Exclude()
    locationId: string;

    @Expose()
    @Type(() => LocationResponseDto)
    location: LocationResponseDto;

    @Expose()
    @Type(() => ReceiverResponseDto)
    receiver: ReceiverResponseDto;

    @Expose()
    @Type(() => ConsumerResponseDto)
    consumers: ConsumerResponseDto[];
}
