import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { IsLocationExistsByUserIdAndIdQuery } from './isLocationExistsByUserIdAndId.query';

@QueryHandler(IsLocationExistsByUserIdAndIdQuery)
export class IsLocationExistsByUserIdAndIdHandler implements IQueryHandler<
    IsLocationExistsByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: IsLocationExistsByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.locationRepository.isExistsByUserIdAndId(
                query.props.userId,
                query.props.id,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
