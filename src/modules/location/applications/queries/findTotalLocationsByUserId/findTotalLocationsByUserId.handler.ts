import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindTotalLocationsByUserIdQuery } from './findTotalLocationsByUserId.query';

@QueryHandler(FindTotalLocationsByUserIdQuery)
export class FindTotalLocationsByUserIdHandler implements IQueryHandler<
    FindTotalLocationsByUserIdQuery,
    number
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindTotalLocationsByUserIdQuery): Promise<number> {
        try {
            return await this.locationRepository.findTotalByUserId(query.props.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
