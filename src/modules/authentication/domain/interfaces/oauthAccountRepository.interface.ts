import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type {
    IInsertOauthAccount,
    ISelectOauthAccount,
} from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

export interface IOauthAccountRepository extends ICreateRepository<
    IInsertOauthAccount,
    ISelectOauthAccount
> {}
