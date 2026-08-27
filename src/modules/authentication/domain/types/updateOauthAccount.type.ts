import type { IInsertOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

export type TUpdateOauthAccount = Partial<IInsertOauthAccount> &
    Required<Pick<IInsertOauthAccount, 'id' | 'updatedAt'>>;
