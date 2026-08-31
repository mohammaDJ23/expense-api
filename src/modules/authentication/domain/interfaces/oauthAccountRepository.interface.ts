import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByEmailIdOrNullRepository } from '@/core/interfaces/repositories/findByEmailIdOrNullRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';
import type { TUpdateOauthAccount } from '@/modules/authentication/domain/types/updateOauthAccount.type';
import type {
    IInsertOauthAccount,
    ISelectOauthAccount,
} from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

export interface IOauthAccountRepository
    extends
        ICreateRepository<IInsertOauthAccount, ISelectOauthAccount>,
        IUpdateRepository<TUpdateOauthAccount, ISelectOauthAccount>,
        IFindByEmailIdOrNullRepository<ISelectOauthAccount> {
    findByProviderAndProviderIdOrNull(
        provider: OauthProvider,
        providerId: string,
    ): Promise<ISelectOauthAccount | null>;
}
