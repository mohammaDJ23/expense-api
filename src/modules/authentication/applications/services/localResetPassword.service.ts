import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { ResetPasswordMailerService } from '@/modules/authentication/applications/services/resetPasswordMailer.service';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { INewPasswordPayload } from '@/modules/authentication/domain/types/newPasswordPayload.type';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalResetPasswordService implements IService<LocalResetPasswordRequestDto, boolean> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
        private readonly resetPasswordMailerService: ResetPasswordMailerService,
    ) {}

    async execute(input: LocalResetPasswordRequestDto): Promise<boolean> {
        let payload: INewPasswordPayload;
        try {
            payload = this.passwordTokenService.verify(input.token);
        } catch {
            throw new BadRequestException();
        }

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.passwordStorageService.get(payload.email);
            } catch {}
            if (storedToken !== input.token) {
                throw new BadRequestException();
            }
        }

        const user = await this.queryDispatcher.execute<
            FindUserByEmailOrNullQuery,
            ISelectUser | null
        >(new FindUserByEmailOrNullQuery({ email: payload.email }));

        if (!user) {
            throw new BadRequestException();
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            throw new ForbiddenException();
        }

        try {
            const hashedPassword = await this.passwordHasherService.hash(input.newPassword);

            await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
                new UpdateUserCommand({
                    id: user.id,
                    updatedAt: getCurrentUTCTimestamp(),
                    hashedPassword,
                }),
            );
        } catch {
            throw new InternalServerErrorException('Could not change your password, try again');
        }

        try {
            this.resetPasswordMailerService.execute(user);

            await this.passwordStorageService.delete(user.email);
        } catch {}

        return true;
    }
}
