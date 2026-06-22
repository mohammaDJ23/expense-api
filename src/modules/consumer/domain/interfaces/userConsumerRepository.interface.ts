import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateManyRepository } from '@/core/interfaces/repositories/createManyRepository.interface';
import type { IFindManyByRefIdAndTargetIdsRepository } from '@/core/interfaces/repositories/findManyByRefIdAndTargetIdsRepository.interface';
import type { IFindTargetByRefIdAndTargetIdOrThrowRepository } from '@/core/interfaces/repositories/findTargetByRefIdAndTargetIdOrThrowRepository.interface';
import type { IFindTargetsByRefIdRepository } from '@/core/interfaces/repositories/findTargetsByRefIdRepository.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type {
    IInsertUserConsumer,
    ISelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository
    extends
        ICreateManyRepository<IInsertUserConsumer, ISelectUserConsumer>,
        IFindManyByRefIdAndTargetIdsRepository<ISelectUserConsumer>,
        IFindTargetsByRefIdRepository<ISelectConsumer, IList>,
        IFindTargetByRefIdAndTargetIdOrThrowRepository<ISelectConsumer> {}
