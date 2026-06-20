import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { omitUndefined } from '@/common/utils/omitUndefined.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { UpdateUserCommand } from './updateUser.command';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: UpdateUserCommand): Promise<ISelectUser> {
        try {
            return await this.userRepository.update(omitUndefined(command));
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
