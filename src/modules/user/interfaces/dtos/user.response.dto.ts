import { Exclude, Expose } from 'class-transformer';

import type { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export class UserResponseDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

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

    @Exclude()
    hashedPassword: string | null;

    @Expose()
    googleId: string | null;

    @Expose()
    authProvider: AuthProvider;

    @Expose()
    verifiedAt: string | null;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;

    @Expose()
    lastLoginAt: string | null;
}
