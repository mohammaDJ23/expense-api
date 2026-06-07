import { ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { IsUserExistsByEmailQuery } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.query';

import { PasswordHasherService } from './passwordHasher.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationTokenService } from './verificationToken.service';

import type { SignupRequestDto } from '@/modules/authentication/interface/dtos/signup.request.dto';
import type { TInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class SignupService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
    ) {}

    async signup(data: SignupRequestDto): Promise<TInsertUser> {
        let isExists = false;
        try {
            const isUserExistsByEmailQuery = new IsUserExistsByEmailQuery(data.email);
            isExists = await this.queryBus.execute<IsUserExistsByEmailQuery, boolean>(
                isUserExistsByEmailQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
        if (isExists) {
            throw new ConflictException('The Email already exists.');
        }

        let createdUser: TInsertUser;
        try {
            const hashedPassword = await this.passwordHasherService.hash(data.password);

            const createUserCommand = new CreateUserCommand({
                email: data.email,
                hashedPassword,
            });
            createdUser = await this.commandBus.execute<CreateUserCommand, TInsertUser>(
                createUserCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        try {
            const token = this.verificationTokenService.sign(createdUser);
            await this.verificationMailerService.sendMail(createdUser, token);
        } catch {
            throw new ServiceUnavailableException(
                'Your email has been saved but we could not send you the verification link, send the verification link manually',
            );
        }

        return createdUser;
    }
}
