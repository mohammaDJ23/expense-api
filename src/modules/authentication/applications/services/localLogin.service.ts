import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateLocalAccountCommand } from '@/modules/authentication/applications/commands/updateLocalAccount/updateLocalAccount.command';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';

import { PasswordHasherService } from './passwordHasher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { Response } from 'express';

interface IInput {
    response: Response;
    body: LocalLoginRequestDto;
}

@Injectable()
export class LocalLoginService implements IService<IInput, boolean> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly queryDispatcher: QueryDispatcher,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async execute(input: IInput): Promise<boolean> {
        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByEmailOrNullQuery,
            ISelectEmailIdentity | null
        >(
            new FindEmailIdentityByEmailOrNullQuery({
                email: input.body.email,
            }),
        );

        if (!emailIdentity) {
            throw new BadRequestException();
        }

        const localAccount = await this.queryBus.execute<
            FindLocalAccountByEmailIdOrNullQuery,
            ISelectLocalAccount | null
        >(
            new FindLocalAccountByEmailIdOrNullQuery({
                emailId: emailIdentity.id,
            }),
        );

        if (!localAccount) {
            throw new NotFoundException();
        }

        if (!localAccount.verifiedAt) {
            throw new ForbiddenException();
        }

        {
            let isPasswordValid = false;
            try {
                isPasswordValid = await this.passwordHasherService.verify(
                    localAccount.hashedPassword,
                    input.body.password,
                );
            } catch {
                throw new ProcessFailedInternalServerErrorException();
            }

            if (!isPasswordValid) {
                throw new ForbiddenException();
            }
        }

        {
            const user = await this.queryDispatcher.execute<FindUserByIdOrThrowQuery, ISelectUser>(
                new FindUserByIdOrThrowQuery({
                    id: emailIdentity.userId,
                }),
            );
            const token = this.accessTokenService.sign({
                id: user.id,
                role: user.role,
            });
            this.accessTokenService.setCookie(input.response, token);
        }

        {
            const creationTime = getCurrentUTCTimestamp();
            await this.commandBus.execute<UpdateLocalAccountCommand, ISelectLocalAccount>(
                new UpdateLocalAccountCommand({
                    id: localAccount.id,
                    updatedAt: creationTime,
                    lastLoginAt: creationTime,
                }),
            );
        }

        return true;
    }
}
