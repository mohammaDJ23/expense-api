import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndExcludingIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndExcludingIdAndNameRepository.interface';
import type { IExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/existsByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndNameRepository } from '@/core/interfaces/repositories/existsByUserIdAndNameRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IFindManyByUserIdAndIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdAndIdsRepository.interface';
import type { IFindTotalByUserIdRepository } from '@/core/interfaces/repositories/findTotalByUserIdRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { ILocationListCursor } from '@/modules/location/domain/types/locationListCursor.type';
import type {
    IInsertLocation,
    ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

export interface ILocationRepository
    extends
        ICreateRepository<IInsertLocation, ISelectLocation>,
        IUpdateRepository<IInsertLocation & Required<Pick<IInsertLocation, 'id'>>, ISelectLocation>,
        IDeleteByUserIdAndIdRepository<ISelectLocation>,
        IFindByUserIdAndIdOrThrowRepository<ISelectLocation>,
        IFindManyByUserIdAndIdsRepository<ISelectLocation>,
        IFindListByUserIdRepository<ISelectLocation, ILocationListCursor>,
        IExistsByUserIdAndIdRepository,
        IExistsByUserIdAndExcludingIdAndNameRepository,
        IExistsByUserIdAndNameRepository,
        IFindTotalByUserIdRepository {}
