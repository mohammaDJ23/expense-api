import { ConflictException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TRequiredInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: CreateUserCommand): Promise<TRequiredInsertUser> {
        const isExists = await this.userRepository.isExistsByEmail(command.email);
        if (isExists) {
            throw new ConflictException('The Email already exists.');
        }
        const userEntity = UserEntity.create(command);
        return this.userRepository.create(userEntity.toInsert());
    }
}
