import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindLocationListByUserIdQuery } from './findLocationListByUserId.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindLocationListByUserIdQuery)
export class FindLocationListByUserIdHandler implements IQueryHandler<
    FindLocationListByUserIdQuery,
    ISelectLocation[]
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindLocationListByUserIdQuery): Promise<ISelectLocation[]> {
        try {
            return await this.locationRepository.findListByUserId(
                query.props.userId,
                query.props.limit,
                query.props.cursor,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
