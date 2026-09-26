import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export class UserResponseDto {
    @Expose()
    @ApiProperty({
        type: 'string',
        example: '9f466902-0a1d-4a24-b7bb-890434bc5adb',
    })
    id: string;

    @Expose()
    @ApiProperty({
        enum: UserRoles,
    })
    role: UserRoles;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'User first name',
        nullable: true,
    })
    firstName: string | null;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'User last name',
        nullable: true,
    })
    lastName: string | null;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: 'https://picture.com/...',
        nullable: true,
    })
    avatar: string | null;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '09121112233',
        nullable: true,
    })
    phone: string | null;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    createdAt: string;

    @Expose()
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    updatedAt: string;
}
