import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { FindUserLocationTargetListByRefIdQuery } from './findUserLocationTargetListByRefId.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindUserLocationTargetListByRefIdQuery)
export class FindUserLocationTargetListByRefIdHandler implements IQueryHandler<
    FindUserLocationTargetListByRefIdQuery,
    ISelectLocation[]
> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    async execute(query: FindUserLocationTargetListByRefIdQuery): Promise<ISelectLocation[]> {
        try {
            return await this.userLocationRepository.findTargetListByRefId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
