import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { IsUserLocationExistsByRefIdAndTargetIdQuery } from './isUserLocationExistsByRefIdAndTargetId.query';

@QueryHandler(IsUserLocationExistsByRefIdAndTargetIdQuery)
export class IsUserLocationExistsByRefIdAndTargetIdHandler implements IQueryHandler<
    IsUserLocationExistsByRefIdAndTargetIdQuery,
    boolean
> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    async execute(query: IsUserLocationExistsByRefIdAndTargetIdQuery): Promise<boolean> {
        try {
            return await this.userLocationRepository.isExistsByRefIdAndTargetId(
                query.userId,
                query.locationId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
