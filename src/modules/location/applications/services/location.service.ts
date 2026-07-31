import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';
import { FindTotalLocationsByUserIdQuery } from '@/modules/location/applications/queries/findTotalLocationsByUserId/findTotalLocationsByUserId.query';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { DeleteLocationService } from '@/modules/location/applications/services/deleteLocation.service';
import { FindLocationListByUserIdService } from '@/modules/location/applications/services/findLocationListByUserId.service';
import { UpdateLocationService } from '@/modules/location/applications/services/updateLocation.service';

import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/listResult.type';
import type { ITotal } from '@/core/types/total.type';
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
        private readonly findLocationListByUserIdService: FindLocationListByUserIdService,
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
    ): Promise<IListResult<ISelectLocation>> {
        return this.findLocationListByUserIdService.execute({ userId, query });
    }

    findByUserIdAndId(userId: string, locationId: string): Promise<ISelectLocation> {
        return this.queryBus.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
            new FindLocationByUserIdAndIdOrThrowQuery({ userId, id: locationId }),
        );
    }

    findTotal(userId: string): Promise<ITotal> {
        return this.queryBus
            .execute<FindTotalLocationsByUserIdQuery, number>(
                new FindTotalLocationsByUserIdQuery({
                    userId,
                }),
            )
            .then((total) => ({ total }));
    }
}
