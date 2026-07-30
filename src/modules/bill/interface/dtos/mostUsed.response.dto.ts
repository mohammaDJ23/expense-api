import { Expose } from 'class-transformer';

export class MostUsedResponseDto {
    @Expose()
    id: string;

    @Expose()
    total: number;
}
