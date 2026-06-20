import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByNameOrNullRepository } from '@/core/interfaces/repositories/findByNameOrNullRepository.interface';
import type {
    IInsertLocation,
    ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

export interface ILocationRepository
    extends
        ICreateRepository<IInsertLocation, ISelectLocation>,
        IFindByNameOrNullRepository<ISelectLocation> {}
