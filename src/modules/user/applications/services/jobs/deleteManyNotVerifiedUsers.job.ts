import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DeleteManyNotVerifiedUsersCommand } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.command';

import type { IJob } from '@/core/interfaces/job.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class DeleteManyNotVerifiedUsersJob implements IJob {
    constructor(private readonly commandBus: CommandBus) {}

    @Cron(CronExpression.EVERY_WEEK)
    async run(): Promise<void> {
        await this.commandBus.execute<DeleteManyNotVerifiedUsersCommand, ISelectUser[]>(
            new DeleteManyNotVerifiedUsersCommand(),
        );
    }
}
