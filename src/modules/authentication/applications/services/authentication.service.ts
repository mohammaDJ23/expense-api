import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { INVALID_CREDENTIAL, PROCESS_FAILED } from '@/common/constants/messages.constant';
import { ForgotPasswordMailerService } from '@/modules/authentication/applications/services/forgotPasswordMailer.service';
import { ForgotPasswordStorageService } from '@/modules/authentication/applications/services/forgotPasswordStorage.service';
import { ForgotPasswordTokenService } from '@/modules/authentication/applications/services/forgotPasswordToken.service';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';

import { AccessTokenService } from './accessToken.service';
import { PasswordHasherService } from './passwordHasher.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { ForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/forgotPassword.request.dto';
import type { LoginRequestDto } from '@/modules/authentication/interface/dtos/login.request.dto';
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
        private readonly forgotPasswordMailerService: ForgotPasswordMailerService,
        private readonly forgotPasswordTokenService: ForgotPasswordTokenService,
        private readonly forgotPasswordStorageService: ForgotPasswordStorageService,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async signup(data: SignupRequestDto): Promise<TInsertUser> {
        let hashedPassword: string;
        let createdUser: TInsertUser;
        try {
            hashedPassword = await this.passwordHasherService.hash(data.password);

            const createUserCommand = new CreateUserCommand(data.email, hashedPassword);
            createdUser = await this.commandBus.execute<CreateUserCommand, TInsertUser>(
                createUserCommand,
            );
        } catch (error) {
            if (error instanceof ConflictException || error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(PROCESS_FAILED);
        }

        try {
            const token = this.verificationTokenService.sign(createdUser);
            await this.verificationMailerService.sendMail(createdUser, token);
            // eslint-disable-next-line no-empty
        } catch {}

        return createdUser;
    }

    private getUserByEmail(email: string): Promise<TSelectUser | null> {
        const getUserByEmailQuery = new GetUserByEmailQuery(email);
        return this.queryBus.execute<GetUserByEmailQuery, TSelectUser | null>(getUserByEmailQuery);
    }

    async login(data: LoginRequestDto): Promise<AccessTokenEntity> {
        let user: TSelectUser | null;
        try {
            user = await this.getUserByEmail(data.email);
        } catch {
            throw new InternalServerErrorException(PROCESS_FAILED);
        }

        if (!user?.verifiedAt) {
            throw new UnauthorizedException(INVALID_CREDENTIAL);
        }

        let isPasswordValid = false;
        try {
            isPasswordValid = await this.passwordHasherService.verify(
                user.hashedPassword,
                data.password,
            );
        } catch {
            throw new InternalServerErrorException(PROCESS_FAILED);
        }

        if (!isPasswordValid) {
            throw new UnauthorizedException(INVALID_CREDENTIAL);
        }

        try {
            const token = this.accessTokenService.sign(user);

            const updateUserCommand = new UpdateUserCommand(user.id, {
                lastLoginAt: new Date(),
            });
            await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);

            return AccessTokenEntity.create(token);
        } catch {
            throw new InternalServerErrorException(PROCESS_FAILED);
        }
    }

    async sendVerification(data: SendVerificationRequestDto): Promise<boolean> {
        let user: TSelectUser | null;
        try {
            user = await this.getUserByEmail(data.email);
        } catch {
            throw new InternalServerErrorException(PROCESS_FAILED);
        }

        if (user && !user.verifiedAt) {
            try {
                const storedToken = await this.verificationStorageService.get(user.email);
                if (storedToken) {
                    return true;
                }
                const token = this.verificationTokenService.sign(user);
                await this.verificationStorageService.set(user.email, token);
                await this.verificationMailerService.sendMail(user, token);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }

    async verifyVerification(data: VerifyVerificationRequestDto): Promise<boolean> {
        let payload: IVerificationPayload;
        let user: TSelectUser | null;
        try {
            payload = this.verificationTokenService.verify(data.token);

            user = await this.getUserByEmail(payload.email);
        } catch {
            throw new InternalServerErrorException(PROCESS_FAILED);
        }

        if (user && !user.verifiedAt) {
            try {
                await this.verificationStorageService.delete(payload.email);

                const updateUserCommand = new UpdateUserCommand(user.id, {
                    verifiedAt: new Date(),
                });
                await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
            } catch {
                throw new InternalServerErrorException('Could not verify your email, try again');
            }
        }

        return true;
    }

    async forgotPassword(data: ForgotPasswordRequestDto): Promise<boolean> {
        let user: TSelectUser | null;
        try {
            user = await this.getUserByEmail(data.email);
        } catch {
            throw new InternalServerErrorException(PROCESS_FAILED);
        }

        if (user?.verifiedAt) {
            try {
                const storedToken = await this.forgotPasswordStorageService.get(user.email);
                if (storedToken) {
                    return true;
                }
                const token = this.forgotPasswordTokenService.sign(user);
                await this.forgotPasswordStorageService.set(user.email, token);
                await this.forgotPasswordMailerService.sendMail(user, token);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }
}
