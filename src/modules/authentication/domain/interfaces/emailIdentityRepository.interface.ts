import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByUserIdOrNullRepository } from '@/core/interfaces/repositories/findByUserIdOrNullRepository.interface';
import type { IFindManyByUserIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdsRepository.interface';
import type {
    IInsertEmailIdentity,
    ISelectEmailIdentity,
} from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

export interface IEmailIdentityRepository
    extends
        ICreateRepository<IInsertEmailIdentity, ISelectEmailIdentity>,
        IFindByUserIdOrNullRepository<ISelectEmailIdentity>,
        IFindManyByUserIdsRepository<ISelectEmailIdentity> {
    findByEmailOrNull(email: string): Promise<ISelectEmailIdentity | null>;
    findByEmailOrThrow(email: string): Promise<ISelectEmailIdentity>;
    existsByEmail(email: string): Promise<boolean>;
}
