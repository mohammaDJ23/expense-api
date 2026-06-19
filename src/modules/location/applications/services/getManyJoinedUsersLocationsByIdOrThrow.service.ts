import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedUsersLocationsByIdOrThrowQuery } from '@/modules/location/applications/queries/getManyJoinedUsersLocationsByIdOrThrow/getManyJoinedUsersLocationsByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class GetManyJoinedUsersLocationsByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, locationsIds: string[]): Promise<TSelectLocation[]> {
        try {
            const getManyJoinedUsersLocationsByIdOrThrowQuery =
                new GetManyJoinedUsersLocationsByIdOrThrowQuery(userId, locationsIds);
            return await this.queryBus.execute<
                GetManyJoinedUsersLocationsByIdOrThrowQuery,
                TSelectLocation[]
            >(getManyJoinedUsersLocationsByIdOrThrowQuery);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
