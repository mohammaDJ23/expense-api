import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DeleteManyNotVerifiedUsersCommand } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class DeleteManyNotVerifiedUsersService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    @Cron(CronExpression.EVERY_WEEK)
    async execute(): Promise<void> {
        try {
            const deleteManyNotVerifiedUsersCommand = new DeleteManyNotVerifiedUsersCommand();
            await this.commandBus.execute<DeleteManyNotVerifiedUsersCommand, TSelectUser[]>(
                deleteManyNotVerifiedUsersCommand,
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
