import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';

import { EmailVerificationMailerService } from './emailVerificationMailer.service';
import { EmailVerificationTokenService } from './emailVerificationToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { SignupDto } from '@/modules/authentication/interface/dtos/signup.dto';
import type { TRequiredInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly emailVerificationMailerService: EmailVerificationMailerService,
        private readonly emailVerificationTokenService: EmailVerificationTokenService,
    ) {}

    async signup(data: SignupDto): Promise<TRequiredInsertUser> {
        const hashedPassword = await this.passwordHasherService.hash(data.password);

        const createUserCommand = new CreateUserCommand(data.email, hashedPassword);
        const createdUser = await this.commandBus.execute(createUserCommand);

        const token = this.emailVerificationTokenService.sign(createdUser);

        await this.emailVerificationMailerService.sendMail(createdUser, token);

        return createdUser;
    }
}
