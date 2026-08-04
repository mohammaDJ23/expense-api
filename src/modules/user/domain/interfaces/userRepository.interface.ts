import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByIdRepository } from '@/core/interfaces/repositories/deleteByIdRepository.interface';
import type { IExistsByIdRepository } from '@/core/interfaces/repositories/existsByIdRepository.interface';
import type { IFindByIdOrNullRepository } from '@/core/interfaces/repositories/findByIdOrNullRepository.interface';
import type { IFindByIdOrThrowRepository } from '@/core/interfaces/repositories/findByIdOrThrowRepository.interface';
import type { IFindListRepository } from '@/core/interfaces/repositories/findListRepository.interface';
import type { IFindManyRepository } from '@/core/interfaces/repositories/findManyRepository.interface';
import type { IFindTotalRepository } from '@/core/interfaces/repositories/findTotalRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { IListQuery } from '@/core/types/listQuery.type';
import type { IInsertUser, ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserRepository
    extends
        ICreateRepository<IInsertUser, ISelectUser>,
        IUpdateRepository<Partial<ISelectUser> & Required<Pick<ISelectUser, 'id'>>, ISelectUser>,
        IFindByIdOrNullRepository<ISelectUser>,
        IFindByIdOrThrowRepository<ISelectUser>,
        IFindListRepository<IListQuery, ISelectUser>,
        IDeleteByIdRepository<ISelectUser>,
        IExistsByIdRepository,
        IFindTotalRepository,
        IFindManyRepository<ISelectUser> {
    deleteManyNotVerified(): Promise<ISelectUser[]>;
    existsByEmail(email: string): Promise<boolean>;
    findByEmailOrNull(email: string): Promise<ISelectUser | null>;
}
