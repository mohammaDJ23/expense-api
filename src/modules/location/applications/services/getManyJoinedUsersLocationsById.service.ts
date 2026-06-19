import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedUsersLocationsByIdQuery } from '@/modules/location/applications/queries/getManyJoinedUsersLocationsById/getManyJoinedUsersLocationsById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class GetManyJoinedUsersLocationsByIdService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, locationsIds: string[]): Promise<TSelectLocation[]> {
        try {
            const getManyJoinedUsersLocationsByIdQuery = new GetManyJoinedUsersLocationsByIdQuery(
                userId,
                locationsIds,
            );
            return await this.queryBus.execute<
                GetManyJoinedUsersLocationsByIdQuery,
                TSelectLocation[]
            >(getManyJoinedUsersLocationsByIdQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
