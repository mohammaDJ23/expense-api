import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

export class MostUsedReceiverResponseDto extends ReceiverResponseDto {
    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    total: number;
}
