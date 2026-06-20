import type { ICreateManyRepository } from '@/core/interfaces/repositories/createManyRepository.interface';
import type { IFindManyByNamesRepository } from '@/core/interfaces/repositories/findManyByNamesRepository.interface';
import type {
    IInsertConsumer,
    ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository
    extends
        ICreateManyRepository<IInsertConsumer, ISelectConsumer>,
        IFindManyByNamesRepository<ISelectConsumer> {}
