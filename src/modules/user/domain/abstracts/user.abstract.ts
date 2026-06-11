import type { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';
import type { IUserAbstract } from '@/modules/user/domain/interfaces/userAbstract.interface';

export abstract class UserAbstract implements Partial<IUserAbstract> {
    public readonly id?: string;
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
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly lastLoginAt?: Date | null;

    constructor(data: Partial<IUserAbstract>) {
        this.id = data.id;
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
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.lastLoginAt = data.lastLoginAt;
    }
}
