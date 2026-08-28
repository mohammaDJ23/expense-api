import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateEmailIdentityCommand } from '@/modules/authentication/applications/commands/createEmailIdentity/createEmailIdentity.command';
import { CreateOauthAccountCommand } from '@/modules/authentication/applications/commands/createOauthAccount/createOauthAccount.command';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindEmailIdentityByEmailOrThrowQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrThrow/findEmailIdentityByEmailOrThrow.query';
import { FindOauthAccountByProviderAndProviderIdOrNullQuery } from '@/modules/authentication/applications/queries/findOauthAccountByProviderAndProviderIdOrNull/findOauthAccountByProviderAndProviderIdOrNull.query';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';
import type { TCreateUser } from '@/modules/user/domain/types/createUser.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    provider: OauthProvider;
    providerId: string;
    email?: string;
    isVerified?: boolean;
    profile(creationTime: string): TCreateUser;
}

@Injectable()
export class OauthAuthenticationService implements IService<IInput, ICurrentUser> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly queryDispatcher: QueryDispatcher,
        private readonly createUserService: CreateUserService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<ICurrentUser> {
        if (!input.email) {
            throw new UnauthorizedException();
        }

        if (!input.isVerified) {
            throw new UnauthorizedException();
        }

        const oauthAccount = await this.queryBus.execute<
            FindOauthAccountByProviderAndProviderIdOrNullQuery,
            ISelectOauthAccount | null
        >(
            new FindOauthAccountByProviderAndProviderIdOrNullQuery({
                provider: input.provider,
                providerId: input.providerId,
            }),
        );

        if (oauthAccount) {
            if (!oauthAccount.verifiedAt) {
                throw new ForbiddenException();
            }

            const emailIdentity = await this.queryBus.execute<
                FindEmailIdentityByEmailOrThrowQuery,
                ISelectEmailIdentity
            >(
                new FindEmailIdentityByEmailOrThrowQuery({
                    email: input.email,
                }),
            );

            const user = await this.findUserById(emailIdentity.userId);

            return {
                id: user.id,
                role: user.role,
            };
        }

        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByEmailOrNullQuery,
            ISelectEmailIdentity | null
        >(
            new FindEmailIdentityByEmailOrNullQuery({
                email: input.email,
            }),
        );

        if (!emailIdentity) {
            const creationTime = getCurrentUTCTimestamp();

            const createdUser = await this.createUserService.execute(input.profile(creationTime));

            const createdEmailIdentity = await this.commandBus.execute<
                CreateEmailIdentityCommand,
                ISelectEmailIdentity
            >(
                new CreateEmailIdentityCommand({
                    email: input.email,
                    userId: createdUser.id,
                    createdAt: creationTime,
                    updatedAt: creationTime,
                }),
            );

            await this.createOauthAccount(
                createdEmailIdentity.id,
                input.provider,
                input.providerId,
                creationTime,
            );

            return {
                id: createdUser.id,
                role: createdUser.role,
            };
        }

        await this.createOauthAccount(emailIdentity.id, input.provider, input.providerId);

        const user = await this.findUserById(emailIdentity.userId);

        return {
            id: user.id,
            role: user.role,
        };
    }

    private findUserById(id: string): Promise<ISelectUser> {
        return this.queryDispatcher.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery({
                id,
            }),
        );
    }

    private createOauthAccount(
        emailId: string,
        provider: OauthProvider,
        providerId: string,
        creationTime = getCurrentUTCTimestamp(),
    ): Promise<ISelectOauthAccount> {
        return this.commandBus.execute<CreateOauthAccountCommand, ISelectOauthAccount>(
            new CreateOauthAccountCommand({
                emailId,
                provider,
                providerId,
                createdAt: creationTime,
                updatedAt: creationTime,
                lastLoginAt: creationTime,
                verifiedAt: creationTime,
            }),
        );
    }
}
