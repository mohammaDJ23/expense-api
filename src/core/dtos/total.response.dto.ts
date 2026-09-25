import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TotalResponseDto {
    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    total: number;
}
