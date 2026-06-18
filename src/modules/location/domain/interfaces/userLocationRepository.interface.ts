import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type {
    TInsertUserLocation,
    TSelectUserLocation,
} from '@/modules/location/infrastructure/schemas/userLocation.schema';

export interface IUserLocationRepository {
    create(data: TInsertUserLocation): Promise<TSelectUserLocation>;
    getByIdOrNull(userId: string, locationId: string): Promise<TSelectUserLocation | null>;
    getJoinedByIdOrThrow(userId: string, locationId: string): Promise<TSelectLocation>;
}
