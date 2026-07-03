import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { ExistsLocationByUserIdAndExcludingIdAndNameQuery } from './existsLocationByUserIdAndExcludingIdAndName.query';

@QueryHandler(ExistsLocationByUserIdAndExcludingIdAndNameQuery)
export class ExistsLocationByUserIdAndExcludingIdAndNameHandler implements IQueryHandler<
    ExistsLocationByUserIdAndExcludingIdAndNameQuery,
    boolean
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: ExistsLocationByUserIdAndExcludingIdAndNameQuery): Promise<boolean> {
        try {
            return await this.locationRepository.existsByUserIdAndExcludingIdAndName(
                query.props.userId,
                query.props.excludingId,
                query.props.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
