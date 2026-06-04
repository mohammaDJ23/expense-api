import { ConflictException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';

import { PasswordHasherService } from './passwordHasher.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationTokenService } from './verificationToken.service';

import type { SendVerificationDto } from '@/modules/authentication/interface/dtos/sendVerification.dto';
import type { SignupDto } from '@/modules/authentication/interface/dtos/signup.dto';
import type { VerifyVerificationDto } from '@/modules/authentication/interface/dtos/verifyVerification.dto';
import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class AuthenticationService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
    ) {}

    async signup(data: SignupDto): Promise<TInsertUser> {
        const hashedPassword = await this.passwordHasherService.hash(data.password);

        const createUserCommand = new CreateUserCommand(data.email, hashedPassword);
        const createdUser = await this.commandBus.execute<CreateUserCommand, TInsertUser>(
            createUserCommand,
        );

        const token = this.verificationTokenService.sign(createdUser);

        await this.verificationMailerService.sendMail(createdUser, token);

        return createdUser;
    }

    async sendVerification(data: SendVerificationDto): Promise<boolean> {
        const getUserByEmailQuery = new GetUserByEmailQuery(data.email);
        const user = await this.queryBus.execute<GetUserByEmailQuery, TSelectUser>(
            getUserByEmailQuery,
        );
        if (user.verifiedAt) {
            throw new ConflictException('Your email has been verified before');
        }

        const token = this.verificationTokenService.sign(user);

        await this.verificationMailerService.sendMail(user, token);

        return true;
    }

    async verifyVerification(data: VerifyVerificationDto): Promise<boolean> {
        const payload = this.verificationTokenService.verify(data.token);

        const getUserByEmailQuery = new GetUserByEmailQuery(payload.email);
        const user = await this.queryBus.execute<GetUserByEmailQuery, TSelectUser>(
            getUserByEmailQuery,
        );
        if (user.verifiedAt) {
            throw new ConflictException('Your email has been verified before');
        }

        const updateUserCommand = new UpdateUserCommand(user.id, { verifiedAt: new Date() });
        await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);

        return true;
    }
}
