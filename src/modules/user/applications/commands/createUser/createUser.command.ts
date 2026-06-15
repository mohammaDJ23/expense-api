import { UserAbstract } from '@/modules/user/domain/abstracts/user.abstract';

import type { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import type { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export class CreateUserCommand extends UserAbstract {
    public override readonly email: string;
    public override readonly role: UserRoles;
    public override readonly authProvider: AuthProvider;
    public override readonly createdAt: string;
    public override readonly updatedAt: string;

    constructor(
        data: UserAbstract &
            Required<
                Pick<UserAbstract, 'email' | 'role' | 'authProvider' | 'createdAt' | 'updatedAt'>
            >,
    ) {
        super(data);

        this.email = data.email;
        this.role = data.role;
        this.authProvider = data.authProvider;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
