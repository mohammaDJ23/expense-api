import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByUserIdOrNullRepository } from '@/core/interfaces/repositories/findByUserIdOrNullRepository.interface';
import type { IFindByUserIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdOrThrowRepository.interface';
import type { IFindListRepository } from '@/core/interfaces/repositories/findListRepository.interface';
import type { IEmailIdentityListCursor } from '@/modules/authentication/domain/types/emailIdentityListCursor.type';
import type {
    IInsertEmailIdentity,
    ISelectEmailIdentity,
} from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

export interface IEmailIdentityRepository
    extends
        ICreateRepository<IInsertEmailIdentity, ISelectEmailIdentity>,
        IFindByUserIdOrNullRepository<ISelectEmailIdentity>,
        IFindByUserIdOrThrowRepository<ISelectEmailIdentity>,
        IFindListRepository<ISelectEmailIdentity, IEmailIdentityListCursor> {
    findByEmailOrNull(email: string): Promise<ISelectEmailIdentity | null>;
    findByEmailOrThrow(email: string): Promise<ISelectEmailIdentity>;
    existsByEmail(email: string): Promise<boolean>;
}
