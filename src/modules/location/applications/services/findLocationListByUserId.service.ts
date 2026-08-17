import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { cursorPagination } from '@/core/utils/pagination/cursorPagination.util';
import { parseCursor } from '@/core/utils/pagination/parseCursor.util';
import { FindLocationListByUserIdQuery } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
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
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    async execute(input: IInput): Promise<IListResult<ISelectLocation>> {
        const locations = await this.queryDispatcher.execute<
            FindLocationListByUserIdQuery,
            ISelectLocation[]
        >(
            new FindLocationListByUserIdQuery({
                userId: input.userId,
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return cursorPagination(locations, input.query.limit);
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
