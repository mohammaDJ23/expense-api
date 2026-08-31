import type { IInsertLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

type TProps = Required<Omit<IInsertLocalAccount, 'id' | 'lastLoginAt'>>;

export class CreateLocalAccountCommand {
    constructor(public readonly props: TProps) {}
}
