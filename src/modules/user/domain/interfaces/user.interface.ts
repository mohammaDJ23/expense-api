import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export interface IUser {
    id: string;
    email: string;
    role: UserRoles;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    phone: string | null;
    hashedPassword: string;
    verifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    lastLoginAt: Date | null;
}
