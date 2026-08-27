import type { IInsertLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

export type TUpdateLocalAccount = Partial<IInsertLocalAccount> &
    Required<Pick<IInsertLocalAccount, 'id' | 'updatedAt'>>;
