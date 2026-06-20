import type { ICreateManyRepository } from '@/core/interfaces/repositories/createManyRepository.interface';
import type { IFindManyByRefIdAndTargetIdsRepository } from '@/core/interfaces/repositories/findManyByRefIdAndTargetIdsRepository.interface';
import type {
    IInsertUserConsumer,
    ISelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository
    extends
        ICreateManyRepository<IInsertUserConsumer, ISelectUserConsumer>,
        IFindManyByRefIdAndTargetIdsRepository<ISelectUserConsumer> {}
