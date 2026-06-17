import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class CreateUserService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(data: CreateUserCommand): Promise<TSelectUser> {
        try {
            const createUserCommand = new CreateUserCommand(data);
            return await this.commandBus.execute<CreateUserCommand, TSelectUser>(createUserCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
