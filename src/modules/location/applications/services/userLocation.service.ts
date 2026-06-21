import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserLocationTargetsByRefIdQuery } from '@/modules/location/applications/queries/findUserLocationTargetsByRefId/findUserLocationTargetsByRefId.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { FindUserLocationTargetsRequestDto } from '@/modules/location/interfaces/dtos/findUserLocationTargets.request.dto';

@Injectable()
export class UserLocationService {
    constructor(private readonly queryBus: QueryBus) {}

    findTargetsByRefId(
        userId: string,
        query: FindUserLocationTargetsRequestDto,
    ): Promise<ISelectLocation[]> {
        return this.queryBus.execute<FindUserLocationTargetsByRefIdQuery, ISelectLocation[]>(
            new FindUserLocationTargetsByRefIdQuery(userId, query.offset, query.limit),
        );
    }
}
