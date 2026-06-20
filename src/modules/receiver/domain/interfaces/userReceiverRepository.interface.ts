import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByRefIdAndTargetIdOrNullRepository } from '@/core/interfaces/repositories/findByRefIdAndTargetIdOrNullRepository.interface';
import type { IFindTargetsByRefIdRepository } from '@/core/interfaces/repositories/findTargetsByRefIdRepository.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type {
    IInsertUserReceiver,
    ISelectUserReceiver,
} from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

export interface IUserReceiverRepository
    extends
        ICreateRepository<IInsertUserReceiver, ISelectUserReceiver>,
        IFindByRefIdAndTargetIdOrNullRepository<ISelectUserReceiver>,
        IFindTargetsByRefIdRepository<ISelectReceiver, IList> {}
