import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindTotalUsersQuery } from '@/modules/user/applications/queries/findTotalUsers/findTotalUsers.query';

import { FindUserListService } from './findUserList.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';

interface IInput {
    query: FindUserListRequestDto;
}

@Injectable()
export class FindUserListAndTotalService implements IService<
    IInput,
    IListResultWithTotal<ISelectUser>
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly findUserListService: FindUserListService,
    ) {}

    async execute(input: IInput): Promise<IListResultWithTotal<ISelectUser>> {
        const [userList, total] = await Promise.all([
            this.findUserListService.execute(input),
            this.queryBus.execute<FindTotalUsersQuery, number>(new FindTotalUsersQuery()),
        ]);

        return {
            ...userList,
            total,
        };
    }
}
