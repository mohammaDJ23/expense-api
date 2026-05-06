import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export interface IUser {
    readonly id: string;
    readonly email: string;
    readonly role: UserRoles;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly avatar: string | null;
    readonly phone: string | null;
    readonly hashedPassword: string;
    readonly verifiedAt: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    readonly lastLoginAt: Date | null;
}
