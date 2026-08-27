import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { TUpdateLocalAccount } from '@/modules/authentication/domain/types/updateLocalAccount.type';
import type {
    IInsertLocalAccount,
    ISelectLocalAccount,
} from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

export interface ILocalAccountRepository
    extends
        ICreateRepository<IInsertLocalAccount, ISelectLocalAccount>,
        IUpdateRepository<TUpdateLocalAccount, ISelectLocalAccount> {
    findByEmailIdOrNull(emailId: string): Promise<ISelectLocalAccount | null>;
}
