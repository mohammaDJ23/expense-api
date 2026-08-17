import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndExcludingIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndExcludingIdAndNameRepository.interface';
import type { IExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/existsByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndNameRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindByUserIdAndNameOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndNameOrNullRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IFindManyByUserIdAndIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdAndIdsRepository.interface';
import type { IFindTotalByUserIdRepository } from '@/core/interfaces/repositories/findTotalByUserIdRepository.interface';
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
        IFindByUserIdAndIdOrThrowRepository<ISelectReceiver>,
        IFindManyByUserIdAndIdsRepository<ISelectReceiver>,
        IFindListByUserIdRepository<ISelectReceiver>,
        IFindByUserIdAndNameOrNullRepository<ISelectReceiver>,
        IExistsByUserIdAndIdRepository,
        IExistsByUserIdAndExcludingIdAndNameRepository,
        IExistsByUserIdAndNameRepository,
        IFindTotalByUserIdRepository {}
