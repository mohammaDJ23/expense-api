import { Expose } from 'class-transformer';

export class ConsumerResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}
