import type { TUpdateOauthAccount } from '@/modules/authentication/domain/types/updateOauthAccount.type';

type TProps = TUpdateOauthAccount;

export class UpdateOauthAccountCommand {
    constructor(public readonly props: TProps) {}
}
