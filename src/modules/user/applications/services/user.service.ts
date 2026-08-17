import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindTotalUsersQuery } from '@/modules/user/applications/queries/findTotalUsers/findTotalUsers.query';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';

import { DeleteUserService } from './deleteUser.service';
import { FindUserListAndTotalService } from './findUserListAndTotal.service';
import { UpdateUserService } from './updateUser.service';

import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';
import type { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly queryDispatcher: QueryDispatcher,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
        private readonly findUserListAndTotalService: FindUserListAndTotalService,
    ) {}

    update(userId: string, body: UpdateUserRequestDto): Promise<IId> {
        return this.updateUserService.execute({ userId, body });
    }

    delete(userId: string): Promise<IId> {
        return this.deleteUserService.execute({ userId });
    }

    findList(query: FindUserListRequestDto): Promise<IListResultWithTotal<ISelectUser>> {
        return this.findUserListAndTotalService.execute({ query });
    }

    findById(userId: string): Promise<ISelectUser> {
        return this.queryBus.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery({ id: userId }),
        );
    }

    findTotal(): Promise<ITotal> {
        return this.queryDispatcher
            .execute<FindTotalUsersQuery, number>(new FindTotalUsersQuery())
            .then((total) => ({ total }));
    }
}
