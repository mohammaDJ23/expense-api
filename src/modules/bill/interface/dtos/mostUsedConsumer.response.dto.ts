import { Expose } from 'class-transformer';

import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';

export class MostUsedConsumerResponseDto extends ConsumerResponseDto {
    @Expose()
    total: number;
}
