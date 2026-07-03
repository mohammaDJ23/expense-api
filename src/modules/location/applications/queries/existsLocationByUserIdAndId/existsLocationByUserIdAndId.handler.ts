import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { ExistsLocationByUserIdAndIdQuery } from './existsLocationByUserIdAndId.query';

@QueryHandler(ExistsLocationByUserIdAndIdQuery)
export class ExistsLocationByUserIdAndIdHandler implements IQueryHandler<
    ExistsLocationByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: ExistsLocationByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.locationRepository.existsByUserIdAndId(
                query.props.userId,
                query.props.id,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
