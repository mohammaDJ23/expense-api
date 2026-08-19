import type { TUpdateUser } from '@/modules/user/domain/types/updateUser.type';

type TProps = TUpdateUser;

export class UpdateUserCommand {
    constructor(public readonly props: TProps) {}
}
