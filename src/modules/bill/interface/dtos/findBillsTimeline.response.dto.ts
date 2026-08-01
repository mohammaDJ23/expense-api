import { Expose } from 'class-transformer';

export class FindBillsTimelineResponseDto {
    @Expose()
    date: string;

    @Expose()
    count: number;
}
