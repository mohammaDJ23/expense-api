import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindTotalLocationsByUserIdQuery } from '@/modules/location/applications/queries/findTotalLocationsByUserId/findTotalLocationsByUserId.query';

import { FindLocationListByUserIdService } from './findLocationListByUserId.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';

interface IInput {
    userId: string;
    query: FindLocationListRequestDto;
}

@Injectable()
export class FindLocationListAndTotalByUserIdService implements IService<
    IInput,
    IListResultWithTotal<ISelectLocation>
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly findLocationListByUserIdService: FindLocationListByUserIdService,
    ) {}

    async execute(input: IInput): Promise<IListResultWithTotal<ISelectLocation>> {
        const [locationList, total] = await Promise.all([
            this.findLocationListByUserIdService.execute(input),
            this.queryDispatcher.execute<FindTotalLocationsByUserIdQuery, number>(
                new FindTotalLocationsByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        return {
            ...locationList,
            total,
        };
    }
}
