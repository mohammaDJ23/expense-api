import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { CreateUserLocationHandler } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.handler';
import { GetJoinedUserLocationByIdOrThrowHandler } from '@/modules/location/applications/queries/getJoinedUserLocationByIdOrThrow/getJoinedUserLocationByIdOrThrow.handler';
import { GetLocationByNameOrNullHandler } from '@/modules/location/applications/queries/getLocationByNameOrNull/getLocationByNameOrNull.handler';
import { GetManyJoinedUsersLocationsByIdHandler } from '@/modules/location/applications/queries/getManyJoinedUsersLocationsById/getManyJoinedUsersLocationsById.handler';
import { GetUserLocationByIdOrNullHandler } from '@/modules/location/applications/queries/getUserLocationByIdOrNull/getUserLocationByIdOrNull.handler';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { CreateUserLocationService } from '@/modules/location/applications/services/createUserLocation.service';
import { CreateUserLocationIfNotExistsService } from '@/modules/location/applications/services/createUserLocationIfNotExists.service';
import { GetJoinedUserLocationByIdOrThrowService } from '@/modules/location/applications/services/GetJoinedUserLocationByIdOrThrow.service';
import { GetLocationByNameOrCreateService } from '@/modules/location/applications/services/getLocationByNameOrCreate.service';
import { GetLocationByNameOrNullService } from '@/modules/location/applications/services/getLocationByNameOrNull.service';
import { GetManyJoinedUsersLocationsByIdService } from '@/modules/location/applications/services/getManyJoinedUsersLocationsById.service';
import { GetUserLocationByIdOrNullService } from '@/modules/location/applications/services/getUserLocationByIdOrNull.service';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateLocationService,
        GetLocationByNameOrNullService,
        GetLocationByNameOrCreateService,
        CreateUserLocationService,
        CreateUserLocationIfNotExistsService,
        GetJoinedUserLocationByIdOrThrowService,
        GetJoinedUserLocationByIdOrThrowHandler,
        GetManyJoinedUsersLocationsByIdService,
        GetManyJoinedUsersLocationsByIdHandler,
        GetUserLocationByIdOrNullService,
        CreateLocationHandler,
        CreateUserLocationHandler,
        GetLocationByNameOrNullHandler,
        GetUserLocationByIdOrNullHandler,
        LocationRepository,
        UserLocationRepository,
    ],
    exports: [
        GetLocationByNameOrCreateService,
        CreateUserLocationIfNotExistsService,
        GetJoinedUserLocationByIdOrThrowService,
        GetManyJoinedUsersLocationsByIdService,
    ],
})
export class LocationModule {}
