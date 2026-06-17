import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class UpdateUserService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(data: UpdateUserCommand): Promise<TSelectUser> {
        try {
            const updateUserCommand = new UpdateUserCommand(data);
            return await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
