import { Expose } from 'class-transformer';

export class FindBillsPeriodResponseDto {
    @Expose()
    start: string | null;

    @Expose()
    end: string | null;
}
