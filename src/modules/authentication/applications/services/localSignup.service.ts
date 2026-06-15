import { ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { IsUserExistsByEmailQuery } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalSignupService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    async signup(data: LocalSignupRequestDto): Promise<boolean> {
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

        let createdUser: TSelectUser;
        try {
            const hashedPassword = await this.passwordHasherService.hash(data.password);

            const createUserCommand = new CreateUserCommand({
                email: data.email,
                hashedPassword,
                role: UserRoles.USER,
                authProvider: AuthProvider.LOCAL,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            });
            createdUser = await this.commandBus.execute<CreateUserCommand, TSelectUser>(
                createUserCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        try {
            const token = this.verificationTokenService.sign(createdUser);
            await this.verificationStorageService.set(createdUser.email, token);
            await this.verificationMailerService.sendMail(createdUser, token);
        } catch {
            throw new ServiceUnavailableException(
                'Your email has been saved but we could not send you the verification link, send the verification link manually',
            );
        }

        return true;
    }
}
