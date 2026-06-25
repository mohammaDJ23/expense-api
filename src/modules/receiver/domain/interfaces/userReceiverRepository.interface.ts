import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByRefIdAndTargetIdOrNullRepository } from '@/core/interfaces/repositories/findByRefIdAndTargetIdOrNullRepository.interface';
import type { IFindTargetByRefIdAndTargetIdOrThrowRepository } from '@/core/interfaces/repositories/findTargetByRefIdAndTargetIdOrThrowRepository.interface';
import type { IFindTargetListByRefIdRepository } from '@/core/interfaces/repositories/findTargetListByRefIdRepository.interface';
import type { IIsExistsByRefIdAndTargetIdRepository } from '@/core/interfaces/repositories/isExistsByRefIdAndTargetIdRepository.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type {
    IInsertUserReceiver,
    ISelectUserReceiver,
} from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

export interface IUserReceiverRepository
    extends
        ICreateRepository<IInsertUserReceiver, ISelectUserReceiver>,
        IFindByRefIdAndTargetIdOrNullRepository<ISelectUserReceiver>,
        IFindTargetListByRefIdRepository<ISelectReceiver, IList>,
        IFindTargetByRefIdAndTargetIdOrThrowRepository<ISelectReceiver>,
        IIsExistsByRefIdAndTargetIdRepository {}
