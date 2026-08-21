import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { UserListCursorPaginationDefinition } from '@/modules/user/applications/pagination/cursor/userListCursorPagination.definition';
import { FindUserListQuery } from '@/modules/user/applications/queries/findUserList/findUserList.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IUserListCursor } from '@/modules/user/domain/types/userListCursor.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';

interface IInput {
    query: FindUserListRequestDto;
}

@Injectable()
export class FindUserListService implements IService<IInput, IListResult<ISelectUser>> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly userListCursorPaginationDefinition: UserListCursorPaginationDefinition,
    ) {}

    async execute(input: IInput): Promise<IListResult<ISelectUser>> {
        const users = await this.queryDispatcher.execute<FindUserListQuery, ISelectUser[]>(
            new FindUserListQuery({
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return this.cursorPaginationService.paginate(
            users,
            input.query.limit,
            this.userListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): IUserListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.userListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
