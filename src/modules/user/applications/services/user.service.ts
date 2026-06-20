import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DeleteManyNotVerifiedUsersCommand } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.command';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';
import { FindUserListQuery } from '@/modules/user/applications/queries/findUserList/findUserList.query';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    findList(query: FindUserListRequestDto): Promise<ISelectUser[]> {
        return this.queryBus.execute<FindUserListQuery, ISelectUser[]>(
            new FindUserListQuery(query.offset, query.limit),
        );
    }

    findById(id: string): Promise<ISelectUser> {
        return this.queryBus.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery(id),
        );
    }

    @Cron(CronExpression.EVERY_WEEK)
    private async deleteManyNotVerifiedUsers(): Promise<void> {
        await this.commandBus.execute<DeleteManyNotVerifiedUsersCommand, ISelectUser[]>(
            new DeleteManyNotVerifiedUsersCommand(),
        );
    }
}
