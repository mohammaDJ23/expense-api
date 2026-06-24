import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByNameOrNullRepository } from '@/core/interfaces/repositories/findByNameOrNullRepository.interface';
import type { IIsExistsByIdsRepository } from '@/core/interfaces/repositories/IsExistsByIdsRepository.interface';
import type {
    IInsertConsumer,
    ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository
    extends
        ICreateRepository<IInsertConsumer, ISelectConsumer>,
        IFindByNameOrNullRepository<ISelectConsumer>,
        IIsExistsByIdsRepository {}
