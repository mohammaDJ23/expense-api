import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery } from '@/modules/location/applications/queries/findUserLocationTargetByRefIdAndTargetIdOrThrow/findUserLocationTargetByRefIdAndTargetIdOrThrow.query';
import { FindUserLocationTargetListByRefIdQuery } from '@/modules/location/applications/queries/findUserLocationTargetListByRefId/findUserLocationTargetListByRefId.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { FindUserLocationTargetsRequestDto } from '@/modules/location/interfaces/dtos/findUserLocationTargets.request.dto';

@Injectable()
export class UserLocationService {
    constructor(private readonly queryBus: QueryBus) {}

    findTargetListByRefId(
        userId: string,
        query: FindUserLocationTargetsRequestDto,
    ): Promise<ISelectLocation[]> {
        return this.queryBus.execute<FindUserLocationTargetListByRefIdQuery, ISelectLocation[]>(
            new FindUserLocationTargetListByRefIdQuery(userId, query.offset, query.limit),
        );
    }

    findTargetByRefIdAndTargetId(userId: string, locationId: string): Promise<ISelectLocation> {
        return this.queryBus.execute<
            FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery,
            ISelectLocation
        >(new FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery(userId, locationId));
    }
}
