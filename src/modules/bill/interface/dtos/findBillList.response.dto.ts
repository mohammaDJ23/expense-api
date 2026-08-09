import { Expose, Type } from 'class-transformer';

import { BillResponseDto } from './bill.response.dto';

export class FindBillListResponseDto {
    @Type(() => BillResponseDto)
    @Expose()
    items: BillResponseDto[];

    @Expose()
    total: number;

    @Expose()
    hasNextPage: boolean;

    @Expose()
    nextCursor: string | null;
}
