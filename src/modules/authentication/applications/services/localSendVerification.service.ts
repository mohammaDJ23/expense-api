import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { VerificationTokenService } from './verificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalSendVerificationMessagePayload } from '@/modules/authentication/domain/types/localSendVerificationMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';

@Injectable()
export class LocalSendVerificationService implements IService<
    LocalSendVerificationRequestDto,
    boolean
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    async execute(input: LocalSendVerificationRequestDto): Promise<boolean> {
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
            const token = this.verificationTokenService.sign(emailIdentity.email);
            const payload: ILocalSendVerificationMessagePayload = {
                email: emailIdentity.email,
                token,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_SEND_VERIFICATION,
                eventType: 'created',
                payload,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return true;
    }
}
