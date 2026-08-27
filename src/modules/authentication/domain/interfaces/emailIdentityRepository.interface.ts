import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type {
    IInsertEmailIdentity,
    ISelectEmailIdentity,
} from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

export interface IEmailIdentityRepository extends ICreateRepository<
    IInsertEmailIdentity,
    ISelectEmailIdentity
> {
    findByEmailOrNull(email: string): Promise<ISelectEmailIdentity | null>;
    existsByEmail(email: string): Promise<boolean>;
}
