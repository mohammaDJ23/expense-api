import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { SignupCommand } from '@/modules/authentication/applications/commands/signup/signup.command';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { PasswordHasherService } from '@/modules/user/applications/services/passwordHashing.service';

import type { UserEntity } from '@/modules/user/domain/entities/user.entity';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
    ) {}

    async execute(command: SignupCommand): Promise<UserEntity> {
        const hashedPassword = await this.passwordHasherService.hash(command.password);
        const createUserCommand = new CreateUserCommand(command.email, hashedPassword);
        return this.commandBus.execute(createUserCommand);
    }
}
