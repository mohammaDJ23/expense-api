import type { ICreateManyRepository } from '@/core/interfaces/repositories/createManyRepository.interface';
import type { IFindTargetsByRefIdsRepository } from '@/core/interfaces/repositories/findTargetsByRefIdsRepository.interface';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type {
    IInsertBillConsumer,
    ISelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

export interface IBillConsumerRepository
    extends
        ICreateManyRepository<IInsertBillConsumer, ISelectBillConsumer>,
        IFindTargetsByRefIdsRepository<ITargetBillConsumer> {}
