import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { ExistsLocationByUserIdAndNameQuery } from './existsLocationByUserIdAndName.query';

@QueryHandler(ExistsLocationByUserIdAndNameQuery)
export class ExistsLocationByUserIdAndNameHandler implements IQueryHandler<
    ExistsLocationByUserIdAndNameQuery,
    boolean
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: ExistsLocationByUserIdAndNameQuery): Promise<boolean> {
        try {
            return await this.locationRepository.existsByUserIdAndName(
                query.props.userId,
                query.props.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
