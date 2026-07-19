import type { IListQuery } from '@/core/interfaces/listQuery.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndExcludingIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndExcludingIdAndNameRepository.interface';
import type { IExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/existsByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndNameRepository.interface';
import type { IFindByUserIdAndIdOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrNullRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindByUserIdAndNameOrNullRepository } from '@/core/interfaces/repositories/findByUserIdAndNameOrNullRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IFindManyByUserIdAndIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdAndIdsRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type {
    IInsertLocation,
    ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

export interface ILocationRepository
    extends
        ICreateRepository<IInsertLocation, ISelectLocation>,
        IUpdateRepository<IInsertLocation & Required<Pick<IInsertLocation, 'id'>>, ISelectLocation>,
        IDeleteByUserIdAndIdRepository<ISelectLocation>,
        IFindByUserIdAndIdOrNullRepository<ISelectLocation>,
        IFindByUserIdAndIdOrThrowRepository<ISelectLocation>,
        IFindManyByUserIdAndIdsRepository<ISelectLocation>,
        IFindListByUserIdRepository<IListQuery, ISelectLocation>,
        IFindByUserIdAndNameOrNullRepository<ISelectLocation>,
        IExistsByUserIdAndIdRepository,
        IExistsByUserIdAndExcludingIdAndNameRepository,
        IExistsByUserIdAndNameRepository {}
