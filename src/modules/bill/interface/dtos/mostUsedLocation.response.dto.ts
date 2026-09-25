import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';

export class MostUsedLocationResponseDto extends LocationResponseDto {
    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    total: number;
}
