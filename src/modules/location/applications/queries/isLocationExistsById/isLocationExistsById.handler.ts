import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { IsLocationExistsByIdQuery } from '@/modules/location/applications/queries/isLocationExistsById/isLocationExistsById.query';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

@QueryHandler(IsLocationExistsByIdQuery)
export class IsLocationExistsByIdHandler implements IQueryHandler<IsLocationExistsByIdQuery> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: IsLocationExistsByIdQuery): Promise<boolean> {
        try {
            return await this.locationRepository.isExistsById(query.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
