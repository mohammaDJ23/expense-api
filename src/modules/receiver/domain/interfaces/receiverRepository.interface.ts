import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByNameOrNullRepository } from '@/core/interfaces/repositories/findByNameOrNullRepository.interface';
import type {
    IInsertReceiver,
    ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IReceiverRepository
    extends
        ICreateRepository<IInsertReceiver, ISelectReceiver>,
        IFindByNameOrNullRepository<ISelectReceiver> {}
