import type { IInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

type TProps = Partial<IInsertUser> &
    Required<Pick<IInsertUser, 'email' | 'role' | 'authProvider' | 'createdAt' | 'updatedAt'>>;

export class CreateUserCommand {
    constructor(public readonly props: TProps) {}
}
