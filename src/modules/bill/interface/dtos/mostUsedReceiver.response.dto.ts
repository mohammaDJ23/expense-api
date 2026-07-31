import { Expose } from 'class-transformer';

import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

export class MostUsedReceiverResponseDto extends ReceiverResponseDto {
    @Expose()
    total: number;
}
