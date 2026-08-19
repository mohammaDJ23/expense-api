import type { TCreateUser } from '@/modules/user/domain/types/createUser.type';

type TProps = TCreateUser;

export class CreateUserCommand {
    constructor(public readonly props: TProps) {}
}
