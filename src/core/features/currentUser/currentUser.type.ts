import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export interface ICurrentUser {
    id: string;
    role: UserRoles;
}
