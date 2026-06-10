import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Transactional } from '@nestjs-cls/transactional';

import { DeleteAllNotVerifiedUsersCommand } from '@/modules/user/applications/commands/deleteAllNotVerifiedUsers/deleteAllNotVerifiedUsers.command';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class DeleteAllNotVerifiedUsersService {
    constructor(private readonly commandBus: CommandBus) {}

    @Cron(CronExpression.EVERY_WEEK)
    @Transactional()
    async deleteNotVerifiedUsers(): Promise<void> {
        try {
            const deleteAllNotVerifiedUsersCommand = new DeleteAllNotVerifiedUsersCommand();
            await this.commandBus.execute<DeleteAllNotVerifiedUsersCommand, TSelectUser>(
                deleteAllNotVerifiedUsersCommand,
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
