import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { IsLocationExistsByUserIdAndIdQuery } from './isLocationExistsByUserIdAndId.query';

import type { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

@QueryHandler(IsLocationExistsByUserIdAndIdQuery)
export class IsLocationExistsByUserIdAndIdHandler implements IQueryHandler<
    IsLocationExistsByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: IsLocationExistsByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.locationRepository.isExistsByUserIdAndId(
                query.userId,
                query.locationId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
