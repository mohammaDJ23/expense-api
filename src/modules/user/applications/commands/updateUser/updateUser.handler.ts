import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: UpdateUserCommand): Promise<TSelectUser> {
        const user = await this.userRepository.getByIdOrThrow(command.id);
        const updatedUser = Object.assign<TSelectUser, UpdateUserCommand, Partial<TInsertUser>>(
            user,
            command,
            { updatedAt: new Date() },
        );
        const userEntity = UserEntity.create(updatedUser);
        return this.userRepository.update(userEntity.toInsert());
    }
}
