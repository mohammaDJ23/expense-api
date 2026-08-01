import type { ICreateManyRepository } from '@/core/interfaces/repositories/createManyRepository.interface';
import type { IDeleteManyByRefIdAndTargetIdsRepository } from '@/core/interfaces/repositories/deleteManyByRefIdAndTargetIdsRepository.interface';
import type { IFindManyByRefIdRepository } from '@/core/interfaces/repositories/findManyByRefIdRepository.interface';
import type { IFindManyTargetsByRefIdsRepository } from '@/core/interfaces/repositories/findManyTargetsByRefIdsRepository.interface';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/types/billConsumer.type';
import type {
    IInsertBillConsumer,
    ISelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

export interface IBillConsumerRepository
    extends
        ICreateManyRepository<IInsertBillConsumer, ISelectBillConsumer>,
        IFindManyTargetsByRefIdsRepository<ITargetBillConsumer>,
        IFindManyByRefIdRepository<ISelectBillConsumer>,
        IDeleteManyByRefIdAndTargetIdsRepository<ISelectBillConsumer> {}
