import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { CreateUserLocationHandler } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.handler';
import { GetJoinedUserLocationByIdOrThrowHandler } from '@/modules/location/applications/queries/getJoinedUserLocationByIdOrThrow/getJoinedUserLocationByIdOrThrow.handler';
import { GetLocationByNameOrNullHandler } from '@/modules/location/applications/queries/getLocationByNameOrNull/getLocationByNameOrNull.handler';
import { GetUserLocationByIdOrNullHandler } from '@/modules/location/applications/queries/getUserLocationByIdOrNull/getUserLocationByIdOrNull.handler';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { CreateUserLocationService } from '@/modules/location/applications/services/createUserLocation.service';
import { CreateUserLocationIfNotExistsService } from '@/modules/location/applications/services/createUserLocationIfNotExists.service';
import { GetJoinedUserLocationByIdOrThrowService } from '@/modules/location/applications/services/GetJoinedUserLocationByIdOrThrow.service';
import { GetLocationByNameOrCreateService } from '@/modules/location/applications/services/getLocationByNameOrCreate.service';
import { GetLocationByNameOrNullService } from '@/modules/location/applications/services/getLocationByNameOrNull.service';
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
    ],
})
export class LocationModule {}
