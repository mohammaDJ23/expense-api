import { Expose } from 'class-transformer';

export class ReceiverResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}
