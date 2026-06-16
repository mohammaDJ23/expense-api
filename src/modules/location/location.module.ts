import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { CreateUserLocationHandler } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.handler';
import { GetLocationByNameOrNullHandler } from '@/modules/location/applications/queries/getLocationByNameOrNull/getLocationByNameOrNull.handler';
import { GetUserLocationByIdOrNullHandler } from '@/modules/location/applications/queries/getUserLocationByIdOrNull/getUserLocationByIdOrNull.handler';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { GetLocationByNameOrCreateService } from '@/modules/location/applications/services/getLocationByNameOrCreate.service';
import { GetLocationByNameOrNullService } from '@/modules/location/applications/services/getLocationByNameOrNull.service';
import { UserLocationService } from '@/modules/location/applications/services/userLocation.service';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        UserLocationService,
        CreateLocationService,
        GetLocationByNameOrNullService,
        GetLocationByNameOrCreateService,
        CreateLocationHandler,
        CreateUserLocationHandler,
        GetLocationByNameOrNullHandler,
        GetUserLocationByIdOrNullHandler,
        LocationRepository,
        UserLocationRepository,
    ],
    exports: [UserLocationService, GetLocationByNameOrCreateService],
})
export class LocationModule {}
