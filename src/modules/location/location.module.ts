import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { CreateUserLocationHandler } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.handler';
import { FindLocationByIdOrThrowHandler } from '@/modules/location/applications/queries/findLocationByIdOrThrow/findLocationByIdOrThrow.handler';
import { FindLocationByNameOrNullHandler } from '@/modules/location/applications/queries/findLocationByNameOrNull/findLocationByNameOrNull.handler';
import { FindManyLocationsByIdsHandler } from '@/modules/location/applications/queries/findManyLocationsByIds/findManyLocationsByIds.handler';
import { FindUserLocationByRefIdAndTargetIdOrNullHandler } from '@/modules/location/applications/queries/findUserLocationByRefIdAndTargetIdOrNull/findUserLocationByRefIdAndTargetIdOrNull.handler';
import { FindUserLocationTargetsByRefIdHandler } from '@/modules/location/applications/queries/findUserLocationTargetsByRefId/findUserLocationTargetsByRefId.handler';
import { UserLocationService } from '@/modules/location/applications/services/userLocation.service';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';
import { LocationController } from '@/modules/location/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule],
    controllers: [LocationController],
    providers: [
        UserLocationService,
        CreateLocationHandler,
        CreateUserLocationHandler,
        FindLocationByNameOrNullHandler,
        FindUserLocationByRefIdAndTargetIdOrNullHandler,
        FindLocationByIdOrThrowHandler,
        FindManyLocationsByIdsHandler,
        FindUserLocationTargetsByRefIdHandler,
        LocationRepository,
        UserLocationRepository,
    ],
})
export class LocationModule {}
