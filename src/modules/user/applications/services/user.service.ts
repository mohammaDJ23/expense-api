import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DeleteManyNotVerifiedUsersCommand } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.command';
import { FindTotalUsersQuery } from '@/modules/user/applications/queries/findTotalUsers/findTotalUsers.query';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';

import { DeleteUserService } from './deleteUser.service';
import { FindUserListService } from './findUserList.service';
import { UpdateUserService } from './updateUser.service';

import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/listResult.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';
import type { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
        private readonly findUserListService: FindUserListService,
    ) {}

    update(userId: string, body: UpdateUserRequestDto): Promise<IId> {
        return this.updateUserService.execute({ userId, body });
    }

    delete(userId: string): Promise<IId> {
        return this.deleteUserService.execute({ userId });
    }

    findList(query: FindUserListRequestDto): Promise<IListResult<ISelectUser>> {
        return this.findUserListService.execute({ query });
    }

    findById(userId: string): Promise<ISelectUser> {
        return this.queryBus.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery({ id: userId }),
        );
    }

    findTotal(): Promise<ITotal> {
        return this.queryBus
            .execute<FindTotalUsersQuery, number>(new FindTotalUsersQuery())
            .then((total) => ({ total }));
    }

    @Cron(CronExpression.EVERY_WEEK)
    protected async deleteManyNotVerifiedUsers(): Promise<void> {
        await this.commandBus.execute<DeleteManyNotVerifiedUsersCommand, ISelectUser[]>(
            new DeleteManyNotVerifiedUsersCommand(),
        );
    }
}
