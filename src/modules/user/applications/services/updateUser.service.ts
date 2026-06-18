import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { omitUndefined } from '@/common/utils/omitUndefined.util';
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
            const updatedProperties = omitUndefined(updateUserCommand);
            return await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updatedProperties);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
