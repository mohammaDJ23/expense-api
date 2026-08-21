import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { LocationListCursorPaginationDefinition } from '@/modules/location/applications/pagination/cursor/locationListCursorPagination.definition';
import { FindLocationListByUserIdQuery } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { ILocationListCursor } from '@/modules/location/domain/types/locationListCursor.type';
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
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly locationListCursorPaginationDefinition: LocationListCursorPaginationDefinition,
    ) {}

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

        return this.cursorPaginationService.paginate(
            locations,
            input.query.limit,
            this.locationListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): ILocationListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.locationListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
