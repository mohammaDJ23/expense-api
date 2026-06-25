import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByRefIdAndTargetIdOrNullRepository } from '@/core/interfaces/repositories/findByRefIdAndTargetIdOrNullRepository.interface';
import type { IFindTargetByRefIdAndTargetIdOrThrowRepository } from '@/core/interfaces/repositories/findTargetByRefIdAndTargetIdOrThrowRepository.interface';
import type { IFindTargetListByRefIdRepository } from '@/core/interfaces/repositories/findTargetListByRefIdRepository.interface';
import type { IIsExistsByRefIdAndTargetIdsRepository } from '@/core/interfaces/repositories/isExistsByRefIdAndTargetIdsRepository.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type {
    IInsertUserConsumer,
    ISelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository
    extends
        ICreateRepository<IInsertUserConsumer, ISelectUserConsumer>,
        IFindByRefIdAndTargetIdOrNullRepository<ISelectUserConsumer>,
        IFindTargetListByRefIdRepository<ISelectConsumer, IList>,
        IFindTargetByRefIdAndTargetIdOrThrowRepository<ISelectConsumer>,
        IIsExistsByRefIdAndTargetIdsRepository {}
