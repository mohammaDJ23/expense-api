import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindLocationListByUserIdQuery } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.query';
import { FindTotalLocationsByUserIdQuery } from '@/modules/location/applications/queries/findTotalLocationsByUserId/findTotalLocationsByUserId.query';

import type { IListResult } from '@/core/interfaces/listResult.interface';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';

interface IInput {
    userId: string;
    query: FindLocationListRequestDto;
}

@Injectable()
export class FindLocationListByUserIdService implements IService<
    IInput,
    IListResult<ISelectLocation>
> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(input: IInput): Promise<IListResult<ISelectLocation>> {
        const [locations, total] = await Promise.all([
            this.queryBus.execute<FindLocationListByUserIdQuery, ISelectLocation[]>(
                new FindLocationListByUserIdQuery({
                    userId: input.userId,
                    offset: input.query.offset,
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalLocationsByUserIdQuery, number>(
                new FindTotalLocationsByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);
        return {
            items: locations,
            total,
        };
    }
}
