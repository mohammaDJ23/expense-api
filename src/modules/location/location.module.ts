import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { DeleteLocationHandler } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.handler';
import { UpdateLocationHandler } from '@/modules/location/applications/commands/updateLocation/updateLocation.handler';
import { FindLocationByUserIdAndIdOrNullHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrNull/findLocationByUserIdAndIdOrNull.handler';
import { FindLocationByUserIdAndIdOrThrowHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.handler';
import { FindLocationByUserIdAndNameOrNullHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndNameOrNull/findLocationByUserIdAndNameOrNull.handler';
import { FindLocationListByUserIdHandler } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.handler';
import { FindManyLocationsByUserIdAndIdsHandler } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.handler';
import { IsLocationExistsByUserIdAndIdHandler } from '@/modules/location/applications/queries/isLocationExistsByUserIdAndId/isLocationExistsByUserIdAndId.handler';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { DeleteLocationService } from '@/modules/location/applications/services/deleteLocation.service';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { UpdateLocationService } from '@/modules/location/applications/services/updateLocation.service';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { LocationController } from '@/modules/location/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule],
    controllers: [LocationController],
    providers: [
        LocationService,
        CreateLocationService,
        DeleteLocationService,
        UpdateLocationService,
        CreateLocationHandler,
        UpdateLocationHandler,
        DeleteLocationHandler,
        FindLocationByUserIdAndIdOrNullHandler,
        FindLocationByUserIdAndIdOrThrowHandler,
        FindLocationByUserIdAndNameOrNullHandler,
        FindLocationListByUserIdHandler,
        FindManyLocationsByUserIdAndIdsHandler,
        IsLocationExistsByUserIdAndIdHandler,
        CreateLocationHandler,
        LocationRepository,
    ],
})
export class LocationModule {}
