import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByIdRepository } from '@/core/interfaces/repositories/deleteByIdRepository.interface';
import type { IExistsByIdRepository } from '@/core/interfaces/repositories/existsByIdRepository.interface';
import type { IFindByIdOrNullRepository } from '@/core/interfaces/repositories/findByIdOrNullRepository.interface';
import type { IFindByIdOrThrowRepository } from '@/core/interfaces/repositories/findByIdOrThrowRepository.interface';
import type { IFindIdListRepository } from '@/core/interfaces/repositories/findIdListRepository.interface';
import type { IFindListRepository } from '@/core/interfaces/repositories/findListRepository.interface';
import type { IFindTotalRepository } from '@/core/interfaces/repositories/findTotalRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { TUpdateUser } from '@/modules/user/domain/types/updateUser.type';
import type { IUserIdListCursor } from '@/modules/user/domain/types/userIdListCursor.type';
import type { IUserListCursor } from '@/modules/user/domain/types/userListCursor.type';
import type { IInsertUser, ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserRepository
    extends
        ICreateRepository<IInsertUser, ISelectUser>,
        IUpdateRepository<TUpdateUser, ISelectUser>,
        IFindByIdOrNullRepository<ISelectUser>,
        IFindByIdOrThrowRepository<ISelectUser>,
        IFindListRepository<ISelectUser, IUserListCursor>,
        IDeleteByIdRepository<ISelectUser>,
        IExistsByIdRepository,
        IFindTotalRepository,
        IFindIdListRepository<IUserIdListCursor> {}
