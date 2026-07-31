import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindTotalUsersQuery } from '@/modules/user/applications/queries/findTotalUsers/findTotalUsers.query';
import { FindUserListQuery } from '@/modules/user/applications/queries/findUserList/findUserList.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';

interface IInput {
    query: FindUserListRequestDto;
}

@Injectable()
export class FindUserListService implements IService<IInput, IListResult<ISelectUser>> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(input: IInput): Promise<IListResult<ISelectUser>> {
        const [users, total] = await Promise.all([
            this.queryBus.execute<FindUserListQuery, ISelectUser[]>(
                new FindUserListQuery({
                    offset: input.query.offset,
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalUsersQuery, number>(new FindTotalUsersQuery()),
        ]);
        return {
            items: users,
            total,
        };
    }
}
