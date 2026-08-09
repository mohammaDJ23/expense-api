import { Expose, Type } from 'class-transformer';

import { ReceiverResponseDto } from './receiver.response.dto';

export class FindReceiverListResponseDto {
    @Type(() => ReceiverResponseDto)
    @Expose()
    items: ReceiverResponseDto[];

    @Expose()
    total: number;

    @Expose()
    hasNextPage: boolean;

    @Expose()
    nextCursor: string | null;
}
