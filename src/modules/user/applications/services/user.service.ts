import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DeleteManyNotVerifiedUsersCommand } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.command';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';
import { FindUserListQuery } from '@/modules/user/applications/queries/findUserList/findUserList.query';
import { DeleteUserService } from '@/modules/user/applications/services/deleteUser.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';

import type { IId } from '@/core/interfaces/id.interface';
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
    ) {}

    update(userId: string, body: UpdateUserRequestDto): Promise<IId> {
        return this.updateUserService.execute({ userId, body });
    }

    delete(userId: string): Promise<IId> {
        return this.deleteUserService.execute({ userId });
    }

    findList(query: FindUserListRequestDto): Promise<ISelectUser[]> {
        return this.queryBus.execute<FindUserListQuery, ISelectUser[]>(
            new FindUserListQuery({
                offset: query.offset,
                limit: query.limit,
            }),
        );
    }

    findById(userId: string): Promise<ISelectUser> {
        return this.queryBus.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery({ id: userId }),
        );
    }

    @Cron(CronExpression.EVERY_WEEK)
    protected async deleteManyNotVerifiedUsers(): Promise<void> {
        await this.commandBus.execute<DeleteManyNotVerifiedUsersCommand, ISelectUser[]>(
            new DeleteManyNotVerifiedUsersCommand(),
        );
    }
}
