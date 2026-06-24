import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByIdOrThrowRepository } from '@/core/interfaces/repositories/findByIdOrThrowRepository.interface';
import type { IFindByNameOrNullRepository } from '@/core/interfaces/repositories/findByNameOrNullRepository.interface';
import type { IFindManyByIdsRepository } from '@/core/interfaces/repositories/findManyByIdsRepository.interface';
import type { IIsExistsByIdRepository } from '@/core/interfaces/repositories/IsExistsByIdRepository.interface';
import type {
    IInsertLocation,
    ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

export interface ILocationRepository
    extends
        ICreateRepository<IInsertLocation, ISelectLocation>,
        IFindByNameOrNullRepository<ISelectLocation>,
        IFindByIdOrThrowRepository<ISelectLocation>,
        IFindManyByIdsRepository<ISelectLocation>,
        IIsExistsByIdRepository {}
