import { Expose } from 'class-transformer';

import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export class UserResponseDto {
    @Expose()
    id: string;

    @Expose()
    role: UserRoles;

    @Expose()
    firstName: string | null;

    @Expose()
    lastName: string | null;

    @Expose()
    avatar: string | null;

    @Expose()
    phone: string | null;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}
