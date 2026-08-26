import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type {
    IInsertLocalAccount,
    ISelectLocalAccount,
} from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

export interface ILocalAccountRepository extends ICreateRepository<
    IInsertLocalAccount,
    ISelectLocalAccount
> {}
