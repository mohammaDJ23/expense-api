import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByIdOrThrowRepository } from '@/core/interfaces/repositories/findByIdOrThrowRepository.interface';
import type { IFindByNameOrNullRepository } from '@/core/interfaces/repositories/findByNameOrNullRepository.interface';
import type { IFindManyByIdsRepository } from '@/core/interfaces/repositories/findManyByIdsRepository.interface';
import type { IIsExistsByIdRepository } from '@/core/interfaces/repositories/IsExistsByIdRepository.interface';
import type {
    IInsertReceiver,
    ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IReceiverRepository
    extends
        ICreateRepository<IInsertReceiver, ISelectReceiver>,
        IFindByNameOrNullRepository<ISelectReceiver>,
        IFindByIdOrThrowRepository<ISelectReceiver>,
        IFindManyByIdsRepository<ISelectReceiver>,
        IIsExistsByIdRepository {}
