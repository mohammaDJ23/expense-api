import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';

export class MostUsedConsumerResponseDto extends ConsumerResponseDto {
    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    total: number;
}
