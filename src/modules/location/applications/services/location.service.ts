import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';
import { FindLocationListByUserIdQuery } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.query';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { DeleteLocationService } from '@/modules/location/applications/services/deleteLocation.service';
import { UpdateLocationService } from '@/modules/location/applications/services/updateLocation.service';

import type { IId } from '@/core/interfaces/id.interface';
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

    create(userId: string, name: string): Promise<IId> {
        return this.createLocationService.execute({ userId, name });
    }

    update(userId: string, body: UpdateLocationRequestDto): Promise<IId> {
        return this.updateLocationService.execute({ userId, body });
    }

    delete(userId: string, locationId: string): Promise<IId> {
        return this.deleteLocationService.execute({ userId, locationId });
    }

    findListByUserId(
        userId: string,
        query: FindLocationListRequestDto,
    ): Promise<ISelectLocation[]> {
        return this.queryBus.execute<FindLocationListByUserIdQuery, ISelectLocation[]>(
            new FindLocationListByUserIdQuery({
                userId,
                offset: query.offset,
                limit: query.limit,
            }),
        );
    }

    findByUserIdAndId(userId: string, locationId: string): Promise<ISelectLocation> {
        return this.queryBus.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
            new FindLocationByUserIdAndIdOrThrowQuery({ userId, id: locationId }),
        );
    }
}
