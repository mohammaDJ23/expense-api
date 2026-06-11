import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { GetLocationByNameOrNullHandler } from '@/modules/location/applications/queries/getLocationByNameOrNull/getLocationByNameOrNull.handler';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

@Module({
    imports: [CqrsModule],
    providers: [CreateLocationHandler, GetLocationByNameOrNullHandler, LocationRepository],
})
export class LocationModule {}
