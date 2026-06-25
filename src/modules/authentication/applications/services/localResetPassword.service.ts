import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ResetPasswordMailerService } from '@/modules/authentication/applications/services/resetPasswordMailer.service';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { INewPasswordPayload } from '@/modules/authentication/domain/interfaces/newPasswordPayload.interface';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalResetPasswordService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
        private readonly resetPasswordMailerService: ResetPasswordMailerService,
    ) {}

    async execute(data: LocalResetPasswordRequestDto): Promise<boolean> {
        let payload: INewPasswordPayload;
        try {
            payload = this.passwordTokenService.verify(data.token);
        } catch {
            throw new BadRequestException();
        }

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.passwordStorageService.get(payload.email);
                // eslint-disable-next-line no-empty
            } catch {}
            if (storedToken !== data.token) {
                throw new BadRequestException();
            }
        }

        {
            const user = await this.queryBus.execute<
                FindUserByEmailOrNullQuery,
                ISelectUser | null
            >(new FindUserByEmailOrNullQuery(payload.email));

            if (!user) {
                return true;
            }

            if (user.authProvider !== AuthProvider.LOCAL) {
                throw new LocalAuthProviderForbiddenException();
            }

            if (user.verifiedAt) {
                try {
                    const hashedPassword = await this.passwordHasherService.hash(data.newPassword);

                    await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
                        new UpdateUserCommand({
                            id: user.id,
                            updatedAt: getCurrentUTCTimestamp(),
                            hashedPassword,
                        }),
                    );
                } catch {
                    throw new InternalServerErrorException(
                        'Could not change your password, try again',
                    );
                }

                try {
                    this.resetPasswordMailerService.execute(user);

                    await this.passwordStorageService.delete(user.email);
                    // eslint-disable-next-line no-empty
                } catch {}
            }

            return true;
        }
    }
}
