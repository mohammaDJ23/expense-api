import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { VerifiedVerificationMailerService } from '@/modules/authentication/applications/services/verifiedVerificationMailer.service';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalVerifyVerificationService implements IService<
    LocalVerifyVerificationRequestDto,
    boolean
> {
    // eslint-disable-next-line max-params
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
        private readonly verifiedVerificationMailerService: VerifiedVerificationMailerService,
    ) {}

    async execute(input: LocalVerifyVerificationRequestDto): Promise<boolean> {
        let user: ISelectUser | null;
        {
            const payload = this.verificationTokenService.verify(input.token);

            {
                let storedToken: string | null = null;
                try {
                    storedToken = await this.verificationStorageService.get(payload.email);
                    // eslint-disable-next-line no-empty
                } catch {}
                if (storedToken !== input.token) {
                    throw new BadRequestException();
                }
            }

            user = await this.queryBus.execute<FindUserByEmailOrNullQuery, ISelectUser | null>(
                new FindUserByEmailOrNullQuery({ email: payload.email }),
            );
        }

        if (!user) {
            return true;
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            try {
                await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
                    new UpdateUserCommand({
                        id: user.id,
                        updatedAt: getCurrentUTCTimestamp(),
                        verifiedAt: getCurrentUTCTimestamp(),
                    }),
                );
            } catch {
                throw new InternalServerErrorException('Could not verify your email, try again');
            }

            try {
                this.verifiedVerificationMailerService.execute(user);

                await this.verificationStorageService.delete(user.email);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }
}
