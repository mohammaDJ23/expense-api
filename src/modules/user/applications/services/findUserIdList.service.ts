import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { UserIdListCursorPaginationDefinition } from '@/modules/user/applications/pagination/cursor/userIdListCursorPagination.definition';
import { FindUserIdListQuery } from '@/modules/user/applications/queries/findUserIdList/findUserIdList.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IUserIdListCursor } from '@/modules/user/domain/types/userIdListCursor.type';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';

interface IInput {
    query: FindUserListRequestDto;
}

@Injectable()
export class FindUserIdListService implements IService<IInput, IListResult<string, string>> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly userIdListCursorPaginationDefinition: UserIdListCursorPaginationDefinition,
    ) {}

    async execute(input: IInput): Promise<IListResult<string, string>> {
        const userIds = await this.queryDispatcher.execute<FindUserIdListQuery, IId[]>(
            new FindUserIdListQuery({
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return this.cursorPaginationService.paginate(
            userIds.map((userId) => userId.id),
            input.query.limit,
            this.userIdListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): IUserIdListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.userIdListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
