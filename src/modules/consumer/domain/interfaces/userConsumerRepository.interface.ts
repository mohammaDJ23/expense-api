import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByRefIdAndTargetIdOrNullRepository } from '@/core/interfaces/repositories/findByRefIdAndTargetIdOrNullRepository.interface';
import type { IFindTargetByRefIdAndTargetIdOrThrowRepository } from '@/core/interfaces/repositories/findTargetByRefIdAndTargetIdOrThrowRepository.interface';
import type { IFindTargetsByRefIdRepository } from '@/core/interfaces/repositories/findTargetsByRefIdRepository.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type {
    IInsertUserConsumer,
    ISelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository
    extends
        ICreateRepository<IInsertUserConsumer, ISelectUserConsumer>,
        IFindByRefIdAndTargetIdOrNullRepository<ISelectUserConsumer>,
        IFindTargetsByRefIdRepository<ISelectConsumer, IList>,
        IFindTargetByRefIdAndTargetIdOrThrowRepository<ISelectConsumer> {}
