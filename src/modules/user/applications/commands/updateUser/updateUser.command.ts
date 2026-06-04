import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export class UpdateUserCommand {
    public readonly id: string;
    public readonly role?: UserRoles;
    public readonly firstName?: string | null;
    public readonly lastName?: string | null;
    public readonly avatar?: string | null;
    public readonly phone?: string | null;
    public readonly verifiedAt?: Date | null;
    public readonly lastLoginAt?: Date | null;

    constructor(id: string, data: Partial<UpdateUserCommand>) {
        this.id = id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.avatar = data.avatar;
        this.phone = data.phone;
        this.verifiedAt = data.verifiedAt;
        this.lastLoginAt = data.lastLoginAt;
    }
}
