import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { PasswordTokenService } from './passwordToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalForgotPasswordMessagePayload } from '@/modules/authentication/domain/types/localForgotPasswordMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';

@Injectable()
export class LocalForgotPasswordService implements IService<
    LocalForgotPasswordRequestDto,
    boolean
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    async execute(input: LocalForgotPasswordRequestDto): Promise<boolean> {
        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByEmailOrNullQuery,
            ISelectEmailIdentity
        >(
            new FindEmailIdentityByEmailOrNullQuery({
                email: input.email,
            }),
        );

        if (!emailIdentity) {
            throw new BadRequestException();
        }

        {
            const localAccount = await this.queryBus.execute<
                FindLocalAccountByEmailIdOrNullQuery,
                ISelectLocalAccount
            >(
                new FindLocalAccountByEmailIdOrNullQuery({
                    emailId: emailIdentity.id,
                }),
            );

            if (!localAccount) {
                throw new BadRequestException();
            }
        }

        {
            const token = this.passwordTokenService.sign(emailIdentity.email);
            const payload: ILocalForgotPasswordMessagePayload = {
                email: emailIdentity.email,
                token,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_FORGOT_PASSWORD,
                eventType: 'created',
                payload,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return true;
    }
}
