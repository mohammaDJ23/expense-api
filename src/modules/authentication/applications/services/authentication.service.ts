import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { InternalServerProcessFailedException } from '@/core/exceptions/internalServerProcessFailed.exception';
import { InvalidCredentialException } from '@/core/exceptions/invalidCredential.exception';
import { UnAuthorizedProcessFailedException } from '@/core/exceptions/unauthorizedProcessFailed.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';
import { IsUserExistsByEmailQuery } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.query';

import { AccessTokenService } from './accessToken.service';
import { PasswordHasherService } from './passwordHasher.service';
import { PasswordMailerService } from './passwordMailer.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { INewPasswordPayload } from '@/modules/authentication/domain/interfaces/newPasswordPayload.interface';
import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { ForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/forgotPassword.request.dto';
import type { LoginRequestDto } from '@/modules/authentication/interface/dtos/login.request.dto';
import type { ResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/resetPassword.request.dto';
import type { SendVerificationRequestDto } from '@/modules/authentication/interface/dtos/sendVerification.request.dto';
import type { SignupRequestDto } from '@/modules/authentication/interface/dtos/signup.request.dto';
import type { VerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/verifyVerification.request.dto';
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
        private readonly verificationStorageService: VerificationStorageService,
        private readonly passwordMailerService: PasswordMailerService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    private getUserByEmail(email: string): Promise<TSelectUser | null> {
        const getUserByEmailQuery = new GetUserByEmailQuery(email);
        return this.queryBus.execute<GetUserByEmailQuery, TSelectUser | null>(getUserByEmailQuery);
    }

    async signup(data: SignupRequestDto): Promise<TInsertUser> {
        let isExists = false;
        try {
            const isUserExistsByEmailQuery = new IsUserExistsByEmailQuery(data.email);
            isExists = await this.queryBus.execute<IsUserExistsByEmailQuery, boolean>(
                isUserExistsByEmailQuery,
            );
        } catch {
            throw new InternalServerProcessFailedException();
        }
        if (isExists) {
            throw new ConflictException('The Email already exists.');
        }

        let hashedPassword: string;
        let createdUser: TInsertUser;
        try {
            hashedPassword = await this.passwordHasherService.hash(data.password);

            const createUserCommand = new CreateUserCommand(data.email, hashedPassword);
            createdUser = await this.commandBus.execute<CreateUserCommand, TInsertUser>(
                createUserCommand,
            );
        } catch {
            throw new InternalServerProcessFailedException();
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

    async login(data: LoginRequestDto): Promise<AccessTokenEntity> {
        let user: TSelectUser | null = null;
        try {
            user = await this.getUserByEmail(data.email);
        } catch {
            throw new InternalServerProcessFailedException();
        }
        if (!user?.verifiedAt) {
            throw new UnAuthorizedProcessFailedException();
        }

        let isPasswordValid = false;
        try {
            isPasswordValid = await this.passwordHasherService.verify(
                user.hashedPassword,
                data.password,
            );
        } catch {
            throw new InternalServerProcessFailedException();
        }
        if (!isPasswordValid) {
            throw new UnAuthorizedProcessFailedException();
        }

        try {
            const token = this.accessTokenService.sign(user);

            const updateUserCommand = new UpdateUserCommand(user.id, {
                lastLoginAt: new Date(),
            });
            await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);

            return AccessTokenEntity.create(token);
        } catch {
            throw new InternalServerProcessFailedException();
        }
    }

    async sendVerification(data: SendVerificationRequestDto): Promise<boolean> {
        let user: TSelectUser | null = null;
        try {
            const storedToken = await this.verificationStorageService.get(data.email);
            if (storedToken) {
                return true;
            }

            user = await this.getUserByEmail(data.email);
        } catch {
            throw new InternalServerProcessFailedException();
        }

        if (user && !user.verifiedAt) {
            try {
                const token = this.verificationTokenService.sign(user);
                await this.verificationStorageService.set(user.email, token);
                await this.verificationMailerService.sendMail(user, token);
            } catch {
                throw new ServiceUnavailableException('Could not send you a verification link');
            }
        }

        return true;
    }

    async verifyVerification(data: VerifyVerificationRequestDto): Promise<boolean> {
        let payload: IVerificationPayload;
        try {
            payload = this.verificationTokenService.verify(data.token);
        } catch {
            throw new InvalidCredentialException();
        }

        let storedToken: string | null = null;
        try {
            storedToken = await this.verificationStorageService.get(payload.email);
            // eslint-disable-next-line no-empty
        } catch {}
        if (storedToken !== data.token) {
            throw new InvalidCredentialException();
        }

        let user: TSelectUser | null = null;
        try {
            user = await this.getUserByEmail(payload.email);
        } catch {
            throw new InternalServerProcessFailedException();
        }

        if (user && !user.verifiedAt) {
            try {
                const updateUserCommand = new UpdateUserCommand(user.id, {
                    verifiedAt: new Date(),
                });
                await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
            } catch {
                throw new InternalServerErrorException('Could not verify your email, try again');
            }

            try {
                await this.verificationStorageService.delete(user.email);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }

    async forgotPassword(data: ForgotPasswordRequestDto): Promise<boolean> {
        let user: TSelectUser | null;
        try {
            const storedToken = await this.passwordStorageService.get(data.email);
            if (storedToken) {
                return true;
            }

            user = await this.getUserByEmail(data.email);
        } catch {
            throw new InternalServerProcessFailedException();
        }

        if (user?.verifiedAt) {
            try {
                const token = this.passwordTokenService.sign(user);
                await this.passwordStorageService.set(user.email, token);
                await this.passwordMailerService.sendMail(user, token);
            } catch {
                throw new ServiceUnavailableException('Could not send you a verification link');
            }
        }

        return true;
    }

    async resetPassword(data: ResetPasswordRequestDto): Promise<boolean> {
        let payload: INewPasswordPayload;
        try {
            payload = this.passwordTokenService.verify(data.token);
        } catch {
            throw new InvalidCredentialException();
        }

        let storedToken: string | null = null;
        try {
            storedToken = await this.passwordStorageService.get(payload.email);
            // eslint-disable-next-line no-empty
        } catch {}
        if (storedToken !== data.token) {
            throw new InvalidCredentialException();
        }

        let user: TSelectUser | null = null;
        try {
            user = await this.getUserByEmail(payload.email);
        } catch {
            throw new InternalServerProcessFailedException();
        }

        if (user?.verifiedAt) {
            try {
                const hashedPassword = await this.passwordHasherService.hash(data.newPassword);

                const updateUserCommand = new UpdateUserCommand(user.id, { hashedPassword });
                await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
            } catch {
                throw new InternalServerErrorException('Could not change your password, try again');
            }

            try {
                await this.passwordStorageService.delete(user.email);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }
}
