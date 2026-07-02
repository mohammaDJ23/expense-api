import type { IInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

type TProps = Partial<IInsertUser> & Required<Pick<IInsertUser, 'updatedAt' | 'id'>>;

export class UpdateUserCommand {
    constructor(public readonly props: TProps) {}
}
