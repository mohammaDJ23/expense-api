import type { IInsertOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

type TProps = Required<Omit<IInsertOauthAccount, 'id'>>;

export class CreateOauthAccountCommand {
    constructor(public readonly props: TProps) {}
}
