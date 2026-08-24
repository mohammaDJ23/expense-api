import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';
import { FindTotalLocationsByUserIdQuery } from '@/modules/location/applications/queries/findTotalLocationsByUserId/findTotalLocationsByUserId.query';

import { CreateLocationService } from './createLocation.service';
import { DeleteLocationService } from './deleteLocation.service';
import { FindLocationListAndTotalByUserIdService } from './findLocationListAndTotalByUserId.service';
import { UpdateLocationService } from './updateLocation.service';

import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

@Injectable()
export class LocationService {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly createLocationService: CreateLocationService,
        private readonly updateLocationService: UpdateLocationService,
        private readonly deleteLocationService: DeleteLocationService,
        private readonly findLocationListAndTotalByUserIdService: FindLocationListAndTotalByUserIdService,
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
    ): Promise<IListResultWithTotal<ISelectLocation, string>> {
        return this.findLocationListAndTotalByUserIdService.execute({ userId, query });
    }

    findByUserIdAndId(userId: string, locationId: string): Promise<ISelectLocation> {
        return this.queryDispatcher.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
            new FindLocationByUserIdAndIdOrThrowQuery({ userId, id: locationId }),
        );
    }

    findTotal(userId: string): Promise<ITotal> {
        return this.queryDispatcher
            .execute<FindTotalLocationsByUserIdQuery, number>(
                new FindTotalLocationsByUserIdQuery({
                    userId,
                }),
            )
            .then((total) => ({ total }));
    }
}
