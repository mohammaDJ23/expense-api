import type { TUpdateLocalAccount } from '@/modules/authentication/domain/types/updateLocalAccount.type';

type TProps = TUpdateLocalAccount;

export class UpdateLocalAccountCommand {
    constructor(public readonly props: TProps) {}
}
