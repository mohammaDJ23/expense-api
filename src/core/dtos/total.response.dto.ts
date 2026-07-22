import { Expose } from 'class-transformer';

export class TotalResponseDto {
    @Expose()
    total: number;
}
