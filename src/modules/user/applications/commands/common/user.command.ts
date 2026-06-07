import type { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export class UserCommand implements Partial<TSelectUser> {
    public readonly email?: string;
    public readonly role?: UserRoles;
    public readonly firstName?: string | null;
    public readonly lastName?: string | null;
    public readonly avatar?: string | null;
    public readonly phone?: string | null;
    public readonly hashedPassword?: string | null;
    public readonly googleId?: string | null;
    public readonly authProvider?: AuthProvider;
    public readonly verifiedAt?: Date | null;
    public readonly lastLoginAt?: Date | null;

    constructor(data: Partial<TSelectUser>) {
        this.email = data.email;
        this.role = data.role;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.avatar = data.avatar;
        this.phone = data.phone;
        this.hashedPassword = data.hashedPassword;
        this.googleId = data.googleId;
        this.authProvider = data.authProvider;
        this.verifiedAt = data.verifiedAt;
        this.lastLoginAt = data.lastLoginAt;
    }
}
