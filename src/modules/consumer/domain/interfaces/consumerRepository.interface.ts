import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndExcludingIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndExcludingIdAndNameRepository.interface';
import type { IExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/existsByUserIdAndIdRepository.interface';
import type { IFindByUserIdAndIdOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrNullRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindByUserIdAndNameOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndNameOrNullRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IFindManyByUserIdAndIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdAndIdsRepository.interface';
import type { IIsExistsByUserIdAndIdsRepository } from '@/core/interfaces/repositories/IsExistsByUserIdAndIdsRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type {
    IInsertConsumer,
    ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository
    extends
        ICreateRepository<IInsertConsumer, ISelectConsumer>,
        IUpdateRepository<IInsertConsumer & Required<Pick<IInsertConsumer, 'id'>>, ISelectConsumer>,
        IDeleteByUserIdAndIdRepository<ISelectConsumer>,
        IFindByUserIdAndIdOrNullRepository<ISelectConsumer>,
        IFindByUserIdAndIdOrThrowRepository<ISelectConsumer>,
        IFindManyByUserIdAndIdsRepository<ISelectConsumer>,
        IFindListByUserIdRepository<IList, ISelectConsumer>,
        IFindByUserIdAndNameOrNullRepository<ISelectConsumer>,
        IIsExistsByUserIdAndIdsRepository,
        IExistsByUserIdAndIdRepository,
        IExistsByUserIdAndExcludingIdAndNameRepository {}
