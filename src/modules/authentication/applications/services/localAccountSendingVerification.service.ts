import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { LocalAccountVerificationTokenService } from './localAccountVerificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalSendVerificationMessagePayload } from '@/modules/authentication/domain/types/localSendVerificationMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalAccountSendingVerificationRequestDto } from '@/modules/authentication/interface/dtos/localAccountSendingVerification.request.dto';

@Injectable()
export class LocalAccountSendingVerificationService implements IService<
    LocalAccountSendingVerificationRequestDto,
    boolean
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly localAccountVerificationTokenService: LocalAccountVerificationTokenService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    async execute(input: LocalAccountSendingVerificationRequestDto): Promise<boolean> {
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

            if (localAccount.verifiedAt) {
                throw new ForbiddenException();
            }
        }

        {
            const token = this.localAccountVerificationTokenService.sign(emailIdentity.email);
            const payload: ILocalSendVerificationMessagePayload = {
                email: emailIdentity.email,
                token,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_ACCOUNT_SENDING_VERIFICATION,
                eventType: 'created',
                payload,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return true;
    }
}
