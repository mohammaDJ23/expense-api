import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { FindUserLocationTargetsByRefIdQuery } from './findUserLocationTargetsByRefId.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindUserLocationTargetsByRefIdQuery)
export class FindUserLocationTargetsByRefIdHandler implements IQueryHandler<
    FindUserLocationTargetsByRefIdQuery,
    ISelectLocation[]
> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    async execute(query: FindUserLocationTargetsByRefIdQuery): Promise<ISelectLocation[]> {
        try {
            return await this.userLocationRepository.findTargetsByRefId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
