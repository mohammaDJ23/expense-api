import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { UserResponseDto } from './user.response.dto';

export class FindUserListResponseDto {
    @Type(() => UserResponseDto)
    @Expose()
    @ApiProperty({
        type: UserResponseDto,
        isArray: true,
    })
    items: UserResponseDto[];

    @Expose()
    @ApiProperty({
        type: 'number',
        example: 10,
    })
    total: number;

    @Expose()
    @ApiProperty({
        type: 'boolean',
        example: true,
    })
    hasNextPage: boolean;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'e25hbWU6ICJkZGQifQ==',
        nullable: true,
    })
    nextCursor: string | null;
}
