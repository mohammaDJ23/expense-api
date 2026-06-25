import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByRefIdAndTargetIdOrNullRepository } from '@/core/interfaces/repositories/findByRefIdAndTargetIdOrNullRepository.interface';
import type { IFindTargetByRefIdAndTargetIdOrThrowRepository } from '@/core/interfaces/repositories/findTargetByRefIdAndTargetIdOrThrowRepository.interface';
import type { IFindTargetListByRefIdRepository } from '@/core/interfaces/repositories/findTargetListByRefIdRepository.interface';
import type { IIsExistsByRefIdAndTargetIdRepository } from '@/core/interfaces/repositories/isExistsByRefIdAndTargetIdRepository.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type {
    IInsertUserLocation,
    ISelectUserLocation,
} from '@/modules/location/infrastructure/schemas/userLocation.schema';

export interface IUserLocationRepository
    extends
        ICreateRepository<IInsertUserLocation, ISelectUserLocation>,
        IFindByRefIdAndTargetIdOrNullRepository<ISelectUserLocation>,
        IFindTargetListByRefIdRepository<ISelectLocation, IList>,
        IFindTargetByRefIdAndTargetIdOrThrowRepository<ISelectLocation>,
        IIsExistsByRefIdAndTargetIdRepository {}
