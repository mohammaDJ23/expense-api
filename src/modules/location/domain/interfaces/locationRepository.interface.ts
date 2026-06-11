import type {
    TInsertLocation,
    TSelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

export interface ILocationRepository {
    create(data: TInsertLocation): Promise<TSelectLocation>;
    getByNameOrNull(name: string): Promise<TSelectLocation | null>;
}
