import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { CreateUserLocationHandler } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.handler';
import { FindLocationByNameOrNullHandler } from '@/modules/location/applications/queries/findLocationByNameOrNull/findLocationByNameOrNull.handler';
import { FindUserLocationByRefIdAndTargetIdOrNullHandler } from '@/modules/location/applications/queries/findUserLocationByRefIdAndTargetIdOrNull/findUserLocationByRefIdAndTargetIdOrNull.handler';
import { FindUserLocationTargetsByRefIdHandler } from '@/modules/location/applications/queries/findUserLocationTargetsByRefId/findUserLocationTargetsByRefId.handler';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateLocationHandler,
        CreateUserLocationHandler,
        FindLocationByNameOrNullHandler,
        FindUserLocationByRefIdAndTargetIdOrNullHandler,
        FindUserLocationTargetsByRefIdHandler,
        LocationRepository,
        UserLocationRepository,
    ],
})
export class LocationModule {}
