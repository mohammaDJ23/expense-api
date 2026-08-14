import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { cursorPagination } from '@/core/utils/pagination/cursorPagination.util';
import { parseCursor } from '@/core/utils/pagination/parseCursor.util';
import { FindUserListQuery } from '@/modules/user/applications/queries/findUserList/findUserList.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { ICursor } from '@/core/utils/pagination/cursor.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';

interface IInput {
    query: FindUserListRequestDto;
}

@Injectable()
export class FindUserListService implements IService<IInput, IListResult<ISelectUser>> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(input: IInput): Promise<IListResult<ISelectUser>> {
        const users = await this.queryBus.execute<FindUserListQuery, ISelectUser[]>(
            new FindUserListQuery({
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return cursorPagination(users, input.query.limit);
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
