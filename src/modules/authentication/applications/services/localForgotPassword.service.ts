import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    ServiceUnavailableException,
} from '@nestjs/common';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordMailerService } from './passwordMailer.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalForgotPasswordService implements IService<
    LocalForgotPasswordRequestDto,
    boolean
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly passwordMailerService: PasswordMailerService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
    ) {}

    async execute(input: LocalForgotPasswordRequestDto): Promise<boolean> {
        try {
            const storedToken = await this.passwordStorageService.get(input.email);
            if (storedToken) {
                return true;
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const user = await this.queryDispatcher.execute<
            FindUserByEmailOrNullQuery,
            ISelectUser | null
        >(
            new FindUserByEmailOrNullQuery({
                email: input.email,
            }),
        );

        if (!user) {
            throw new BadRequestException();
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            throw new ForbiddenException();
        }

        const token = this.passwordTokenService.sign(user);

        try {
            await this.passwordStorageService.set(user.email, token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        try {
            await this.passwordMailerService.execute({ user, token });
        } catch {
            try {
                await this.passwordStorageService.delete(user.email);
            } catch {}

            throw new ServiceUnavailableException('Could not send you a verification link');
        }

        return true;
    }
}
