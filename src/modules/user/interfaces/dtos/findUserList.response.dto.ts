import { Expose, Type } from 'class-transformer';

import { UserResponseDto } from './user.response.dto';

export class FindUserListResponseDto {
    @Type(() => UserResponseDto)
    @Expose()
    items: UserResponseDto[];

    @Expose()
    total: number;

    @Expose()
    hasNextPage: boolean;

    @Expose()
    nextCursor: string | null;
}
