import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';
import { FindLocationListByUserIdQuery } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.query';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { DeleteLocationService } from '@/modules/location/applications/services/deleteLocation.service';
import { UpdateLocationService } from '@/modules/location/applications/services/updateLocation.service';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

@Injectable()
export class LocationService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly createLocationService: CreateLocationService,
        private readonly updateLocationService: UpdateLocationService,
        private readonly deleteLocationService: DeleteLocationService,
    ) {}

    create(userId: string, name: string): Promise<IdEntity> {
        return this.createLocationService.execute(userId, name);
    }

    update(userId: string, data: UpdateLocationRequestDto): Promise<IdEntity> {
        return this.updateLocationService.execute(userId, data);
    }

    delete(userId: string, locationId: string): Promise<IdEntity> {
        return this.deleteLocationService.execute(userId, locationId);
    }

    findListByUserId(userId: string, data: FindLocationListRequestDto): Promise<ISelectLocation[]> {
        return this.queryBus.execute<FindLocationListByUserIdQuery, ISelectLocation[]>(
            new FindLocationListByUserIdQuery(userId, data.offset, data.limit),
        );
    }

    findByUserIdAndId(userId: string, locationId: string): Promise<ISelectLocation> {
        return this.queryBus.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
            new FindLocationByUserIdAndIdOrThrowQuery(userId, locationId),
        );
    }
}
