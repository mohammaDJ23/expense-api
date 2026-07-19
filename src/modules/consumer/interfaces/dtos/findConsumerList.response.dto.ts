import { Expose, Type } from 'class-transformer';

import { ConsumerResponseDto } from './consumer.response.dto';

export class FindConsumerListResponseDto {
    @Type(() => ConsumerResponseDto)
    @Expose()
    items: ConsumerResponseDto[];

    @Expose()
    total: number;
}
