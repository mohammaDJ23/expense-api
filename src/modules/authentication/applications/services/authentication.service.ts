import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { PasswordHasherService } from '@/modules/user/applications/services/passwordHasher.service';

import type { SignupDto } from '@/modules/authentication/interface/dtos/signup.dto';
import type { TRequiredInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
    ) {}

    async signup(data: SignupDto): Promise<TRequiredInsertUser> {
        const hashedPassword = await this.passwordHasherService.hash(data.password);
        const createUserCommand = new CreateUserCommand(data.email, hashedPassword);
        return this.commandBus.execute(createUserCommand);
    }
}
