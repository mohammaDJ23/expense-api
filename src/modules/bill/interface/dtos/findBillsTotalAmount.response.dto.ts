import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindBillsTotalAmountResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '11200000',
        nullable: true,
    })
    totalAmount: string | null;
}
