import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { cursorPagination } from '@/core/utils/pagination/cursorPagination.util';
import { parseCursor } from '@/core/utils/pagination/parseCursor.util';
import { FindLocationListByUserIdQuery } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.query';
import { FindTotalLocationsByUserIdQuery } from '@/modules/location/applications/queries/findTotalLocationsByUserId/findTotalLocationsByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.type';
import type { ICursor } from '@/core/utils/pagination/cursor.type';
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
                    cursor: this.parseCursor(input.query.cursor),
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalLocationsByUserIdQuery, number>(
                new FindTotalLocationsByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        const pagination = cursorPagination(locations, input.query.limit);

        return {
            ...pagination,
            total,
        };
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
