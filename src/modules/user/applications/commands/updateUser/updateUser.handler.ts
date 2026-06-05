import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { omitUndefined } from '@/common/utils/omitUndefined.util';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(command: UpdateUserCommand): Promise<TSelectUser> {
        const { id, ...properties } = command;
        const updatedData = Object.assign<
            Omit<UpdateUserCommand, 'id'>,
            Pick<TInsertUser | TSelectUser, 'updatedAt'> & Omit<Partial<UpdateUserCommand>, 'id'>
        >(omitUndefined(properties), {
            updatedAt: new Date(),
        });
        return this.userRepository.update(id, updatedData);
    }
}
