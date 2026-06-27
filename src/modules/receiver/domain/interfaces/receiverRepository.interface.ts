import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IFindByUserIdAndIdOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrNullRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindByUserIdAndNameOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndNameOrNullRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IFindManyByUserIdAndIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdAndIdsRepository.interface';
import type { IIsExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/IsExistsByUserIdAndIdRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type {
    IInsertReceiver,
    ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IReceiverRepository
    extends
        ICreateRepository<IInsertReceiver, ISelectReceiver>,
        IUpdateRepository<IInsertReceiver & Required<Pick<IInsertReceiver, 'id'>>, ISelectReceiver>,
        IDeleteByUserIdAndIdRepository<ISelectReceiver>,
        IFindByUserIdAndIdOrNullRepository<ISelectReceiver>,
        IFindByUserIdAndIdOrThrowRepository<ISelectReceiver>,
        IFindManyByUserIdAndIdsRepository<ISelectReceiver>,
        IFindListByUserIdRepository<IList, ISelectReceiver>,
        IFindByUserIdAndNameOrNullRepository<ISelectReceiver>,
        IIsExistsByUserIdAndIdRepository {}
